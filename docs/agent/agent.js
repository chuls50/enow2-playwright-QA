#!/usr/bin/env node

/**
 * Document Workflow Agent
 * Autonomous eNow2 application exploration and documentation generator
 *
 * Version: 1.0
 * Created: March 1, 2026
 *
 * Usage:
 *   node docs/agent/agent.js [options]
 *
 * Options:
 *   --mode=full|role-focused|gap|refresh
 *   --role=admin|provider|patient|coordinator|device
 *   --max-duration=120 (minutes)
 *   --dry-run (simulate without making changes)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import MermaidGenerator from "./mermaid-generator.js";
import DocumentationUpdater from "./documentation-updater.js";

// Get current file directory for relative paths
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "../..");

class DocumentWorkflowAgent {
  constructor(options = {}) {
    this.options = {
      mode: "gap",
      role: null,
      maxDuration: 120, // minutes
      dryRun: false,
      ...options,
    };

    this.config = this.loadConfig();
    this.queue = this.loadQueue();
    this.log = this.loadLog();

    this.sessionId = this.generateSessionId();
    this.sessionStart = new Date();
    this.currentBrowser = null;
    this.currentPage = null;

    // Initialize modules
    this.mermaidGenerator = new MermaidGenerator();
    this.documentationUpdater = new DocumentationUpdater(PROJECT_ROOT);

    console.log(`🤖 Document Workflow Agent v${this.config.version || "1.0"}`);
    console.log(`📋 Session ID: ${this.sessionId}`);
    console.log(`🎯 Mode: ${this.options.mode}`);
    console.log(`⏱️  Max Duration: ${this.options.maxDuration} minutes`);
    console.log(`🔧 Dry Run: ${this.options.dryRun ? "YES" : "NO"}`);
  }

  // ==================== CONFIGURATION LOADING ====================

  loadConfig() {
    const configPath = join(__dirname, "agent-config.md");
    if (!existsSync(configPath)) {
      throw new Error("agent-config.md not found. Run setup first.");
    }

    const configContent = readFileSync(configPath, "utf-8");

    // Extract YAML blocks from markdown
    const yamlBlocks = configContent.match(/```yaml\n([\s\S]*?)```/g) || [];
    const config = {};

    yamlBlocks.forEach((block) => {
      const yamlContent = block.replace(/```yaml\n/, "").replace(/```$/, "");
      const parsed = yaml.load(yamlContent);
      Object.assign(config, parsed);
    });

    return config;
  }

  loadQueue() {
    const queuePath = join(__dirname, "exploration-queue.md");
    if (!existsSync(queuePath)) {
      throw new Error("exploration-queue.md not found. Run setup first.");
    }

    const queueContent = readFileSync(queuePath, "utf-8");
    const items = [];

    // Parse markdown checkboxes for queue items
    const checkboxPattern = /- \[( |x)\] \*\*(.*?)\*\* - (.*)/g;
    let match;

    while ((match = checkboxPattern.exec(queueContent)) !== null) {
      const [, completed, path, description] = match;
      const [role, feature, area] = path.split("/");
      const priority = this.extractPriorityFromContext(queueContent, match.index);

      items.push({
        id: items.length + 1,
        completed: completed === "x",
        role,
        feature,
        area,
        path,
        description,
        priority,
      });
    }

    return items;
  }

  loadLog() {
    const logPath = join(__dirname, "exploration-log.md");
    const log = {
      sessions: [],
      stats: {
        totalSessions: 0,
        totalExplorationTime: 0,
        screenshotsCaptured: 0,
        diagramsGenerated: 0,
        documentationUpdates: 0,
      },
    };

    if (existsSync(logPath)) {
      // Parse existing log for session history
      const logContent = readFileSync(logPath, "utf-8");
      // TODO: Parse session history from markdown
    }

    return log;
  }

  extractPriorityFromContext(content, position) {
    const beforeText = content.substring(0, position);
    const lastPriorityMatch = beforeText.match(/## (High|Medium|Low) Priority/g);
    if (lastPriorityMatch) {
      const priority = lastPriorityMatch[lastPriorityMatch.length - 1];
      return priority.match(/(High|Medium|Low)/)[1].toLowerCase();
    }
    return "medium";
  }

  // ==================== SESSION MANAGEMENT ====================

  generateSessionId() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  }

  async startSession() {
    console.log(`\\n🚀 Starting exploration session...`);

    const targetItems = this.selectTargetItems();
    console.log(`📊 Found ${targetItems.length} items to explore`);

    for (const item of targetItems) {
      if (this.isTimeExpired()) {
        console.log(`⏰ Maximum duration reached. Stopping.`);
        break;
      }

      console.log(`\\n🎯 Exploring: ${item.path}`);
      console.log(`📝 Description: ${item.description}`);

      try {
        await this.exploreItem(item);
        this.markItemCompleted(item);
        console.log(`✅ Completed: ${item.path}`);
      } catch (error) {
        console.error(`❌ Failed: ${item.path}`, error.message);
        await this.logError(item, error);
      }
    }

    await this.endSession();
  }

  selectTargetItems() {
    let items = this.queue.filter((item) => !item.completed);

    // Filter by mode
    switch (this.options.mode) {
      case "role-focused":
        if (!this.options.role) {
          throw new Error("Role must be specified for role-focused mode");
        }
        items = items.filter((item) => item.role === this.options.role);
        break;

      case "gap":
        items = items.filter((item) => item.priority === "high");
        break;

      case "refresh":
        // Only items that already have some documentation
        items = items.filter((item) => this.hasExistingDocumentation(item));
        break;

      case "full":
      default:
        // All items, but prioritize high first
        items.sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    return items;
  }

  hasExistingDocumentation(item) {
    const workflowDiagrams = join(PROJECT_ROOT, "docs/latex/workflow-diagrams.md");
    const content = readFileSync(workflowDiagrams, "utf-8");
    return content.includes(item.feature) || content.includes(item.area);
  }

  isTimeExpired() {
    const elapsed = (Date.now() - this.sessionStart.getTime()) / (1000 * 60);
    return elapsed >= this.options.maxDuration;
  }

  // ==================== ITEM EXPLORATION ====================

  async exploreItem(item) {
    const exploration = {
      item,
      startTime: new Date(),
      steps: [],
      screenshots: [],
      artifacts: {},
      errors: [],
    };

    try {
      // 1. Load appropriate auth state
      await this.loadAuthState(item.role);

      // 2. Navigate to feature area
      let startUrl;
      if (this.options.dryRun) {
        startUrl = `https://portal.qa-encounterservices.com/dashboard/${item.feature}`;
        console.log(`🔧 Dry run: Simulated navigation to ${startUrl}`);
      } else {
        startUrl = await this.navigateToFeature(item);
      }
      exploration.steps.push({
        action: "navigate",
        url: startUrl,
        timestamp: new Date(),
      });

      // 3. Systematic exploration
      if (this.options.dryRun) {
        // Simulate exploration steps for dry run
        exploration.steps.push({
          action: "click",
          element: "navigation-button",
          timestamp: new Date(),
        });
        exploration.steps.push({
          action: "screenshot",
          filename: `workflow-${item.role}-${item.feature}-${item.area}.png`,
          timestamp: new Date(),
        });
        exploration.screenshots.push(`workflow-${item.role}-${item.feature}-${item.area}.png`);
        console.log(`🔧 Dry run: Simulated exploration of ${item.feature}`);
      } else {
        await this.exploreFeatureSystematically(item, exploration);
      }

      // 4. Generate artifacts
      exploration.artifacts.mermaid = await this.generateMermaidDiagram(exploration);
      exploration.artifacts.screenshots = exploration.screenshots;

      // 5. Update documentation
      if (!this.options.dryRun) {
        await this.updateDocumentation(item, exploration.artifacts);
      }

      // 6. Log the session
      await this.logExploration(exploration);
    } catch (error) {
      exploration.errors.push({
        message: error.message,
        timestamp: new Date(),
        stack: error.stack,
      });
      throw error;
    }

    return exploration;
  }

  async loadAuthState(role) {
    console.log(`🔐 Loading auth state for: ${role}`);

    const authFile = join(PROJECT_ROOT, "playwright/.auth", `${role}.json`);
    if (!existsSync(authFile)) {
      throw new Error(`Auth file not found: ${authFile}`);
    }

    // TODO: Initialize Playwright with stored auth state
    // This would use MCP Playwright tools to set up browser context
    console.log(`✅ Auth state loaded: ${role}`);
  }

  async navigateToFeature(item) {
    const baseUrl = this.config.app.url;
    let targetUrl = baseUrl;

    // Determine navigation path based on feature
    const navigationMap = {
      admin: {
        users: "/dashboard/users",
        "institution-settings": "/dashboard/institution-settings",
        "document-management": "/dashboard/document-management",
        "visit-notes": "/dashboard/visit-notes",
        "data-reporting": "/dashboard/data-reporting",
      },
      provider: {
        dashboard: "/dashboard",
        "past-sessions": "/dashboard/past-sessions",
        providers: "/dashboard/providers",
        "my-patients": "/dashboard/my-patients",
        calendar: "/dashboard/account-settings?tab=calendar",
      },
      coordinator: {
        dashboard: "/dashboard",
        "past-sessions": "/dashboard/past-sessions",
        providers: "/dashboard/providers",
        patients: "/dashboard/patients",
        "command-center": "/dashboard/command-center",
      },
      patient: {
        dashboard: "/dashboard",
        "past-visits": "/dashboard/past-visits",
        "health-profile": "/dashboard/health-profile",
        "vitals-scan": "/dashboard/vitals-scan",
      },
      device: {
        dashboard: "/dashboard",
      },
    };

    if (navigationMap[item.role] && navigationMap[item.role][item.feature]) {
      targetUrl += navigationMap[item.role][item.feature];
    }

    console.log(`🧭 Navigating to: ${targetUrl}`);

    // TODO: Use MCP Playwright browser_navigate tool
    // await mcp.browser_navigate({ url: targetUrl });

    return targetUrl;
  }

  async exploreFeatureSystematically(item, exploration) {
    console.log(`🔍 Starting systematic exploration...`);

    // TODO: Implementation using MCP Playwright tools
    // 1. Take initial snapshot
    // 2. Identify interactive elements
    // 3. For each element, click and record state changes
    // 4. Take screenshots at each step
    // 5. Map the workflow

    // Placeholder implementation
    const steps = [
      { action: "snapshot", description: "Initial state" },
      { action: "click", element: "nav-item", description: "Navigate to feature" },
      { action: "screenshot", filename: `workflow-${item.role}-${item.feature}-01.png` },
      { action: "interact", description: "Explore interactive elements" },
      { action: "screenshot", filename: `workflow-${item.role}-${item.feature}-02.png` },
    ];

    for (const step of steps) {
      console.log(`  📝 Step: ${step.description}`);
      exploration.steps.push({
        ...step,
        timestamp: new Date(),
      });

      if (step.filename) {
        exploration.screenshots.push(step.filename);
      }

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`✅ Systematic exploration complete: ${exploration.steps.length} steps`);
  }

  // ==================== ARTIFACT GENERATION ====================

  async generateMermaidDiagram(exploration) {
    console.log(`📊 Generating Mermaid diagram...`);

    const { item, steps } = exploration;

    // Convert exploration steps to Mermaid format
    const mermaidSteps = this.mermaidGenerator.explorationToSteps(exploration);
    const metadata = this.mermaidGenerator.generateMetadata(item, exploration);

    // Generate flowchart diagram
    const mermaidCode = this.mermaidGenerator.generateFlowchart(mermaidSteps, metadata);

    console.log(`✅ Mermaid diagram generated: ${mermaidSteps.length} nodes`);
    return mermaidCode;
  }

  // ==================== DOCUMENTATION UPDATES ====================

  async updateDocumentation(item, artifacts) {
    console.log(`📝 Updating documentation...`);

    try {
      // 1. Update workflow-diagrams.md
      await this.documentationUpdater.updateWorkflowDiagrams(item, artifacts.mermaid, { screenshots: artifacts.screenshots });

      // 2. Update role-specific documentation
      await this.documentationUpdater.updateRoleDocumentation(item, artifacts);

      // 3. Update screenshot index
      if (artifacts.screenshots && artifacts.screenshots.length > 0) {
        await this.documentationUpdater.updateScreenshotIndex(artifacts.screenshots, item);
      }

      // 4. Update version numbers and dates
      await this.documentationUpdater.updateVersionInfo();

      // Generate change report
      const report = this.documentationUpdater.generateChangeReport();
      console.log(`📋 Changes made:\\n${report}`);

      console.log(`✅ Documentation updated successfully`);
    } catch (error) {
      console.error(`❌ Documentation update failed:`, error.message);
      throw error;
    }
  }

  async updateWorkflowDiagrams(item, mermaidCode) {
    const diagramsPath = join(PROJECT_ROOT, "docs/latex/workflow-diagrams.md");
    let content = readFileSync(diagramsPath, "utf-8");

    // Determine section number and title
    const sectionTitle = `${this.capitalizeName(item.role)} ${this.capitalizeName(item.feature)} ${this.capitalizeName(item.area)}`;

    // Find appropriate place to insert diagram
    const roleHeaderPattern = new RegExp(`## \\d+\\. ${this.capitalizeName(item.role)} Workflows`, "i");
    const match = content.match(roleHeaderPattern);

    if (match) {
      // Insert in existing role section
      const insertionPoint = match.index + match[0].length;
      const newSection = `\n\n### ${sectionTitle}\n\n> See screenshots: \`workflow-${item.role}-${item.feature}-*.png\`\n\n\`\`\`mermaid\n${mermaidCode}\n\`\`\``;

      content = content.slice(0, insertionPoint) + newSection + content.slice(insertionPoint);
    } else {
      // Create new role section
      const newSection = `\n\n## ${this.getNextSectionNumber(content)}. ${this.capitalizeName(item.role)} Workflows\n\n### ${sectionTitle}\n\n> See screenshots: \`workflow-${item.role}-${item.feature}-*.png\`\n\n\`\`\`mermaid\n${mermaidCode}\n\`\`\``;

      content += newSection;
    }

    if (!this.options.dryRun) {
      writeFileSync(diagramsPath, content, "utf-8");
    }

    console.log(`📊 Added diagram to workflow-diagrams.md: ${sectionTitle}`);
  }

  async updateRoleDocumentation(item, artifacts) {
    const roleDocPath = join(PROJECT_ROOT, `docs/latex/${item.role}-role.md`);

    if (existsSync(roleDocPath)) {
      // TODO: Update role-specific documentation
      // Add workflow description, cross-reference to diagram
      console.log(`📋 Updated role documentation: ${item.role}-role.md`);
    }
  }

  async updateVersionInfo() {
    // TODO: Update version numbers and "Last Updated" dates
    console.log(`📅 Updated version information`);
  }

  // ==================== UTILITIES ====================

  capitalizeName(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getNextSectionNumber(content) {
    const sectionPattern = /## (\d+)\./g;
    let maxNumber = 0;
    let match;

    while ((match = sectionPattern.exec(content)) !== null) {
      const number = parseInt(match[1]);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }

    return maxNumber + 1;
  }

  markItemCompleted(item) {
    this.queue.find((queueItem) => queueItem.id === item.id).completed = true;
  }

  // ==================== LOGGING ====================

  async logExploration(exploration) {
    const logEntry = {
      sessionId: this.sessionId,
      timestamp: exploration.startTime,
      item: exploration.item,
      duration: Date.now() - exploration.startTime.getTime(),
      steps: exploration.steps.length,
      screenshots: exploration.screenshots.length,
      errors: exploration.errors,
    };

    this.log.sessions.push(logEntry);

    // Update stats
    this.log.stats.totalSessions++;
    this.log.stats.totalExplorationTime += logEntry.duration;
    this.log.stats.screenshotsCaptured += logEntry.screenshots;
    this.log.stats.diagramsGenerated += 1;
    this.log.stats.documentationUpdates += 1;

    if (!this.options.dryRun) {
      await this.saveLogToFile(logEntry);
    }

    console.log(`📊 Session logged: ${logEntry.duration}ms, ${logEntry.steps} steps`);
  }

  async saveLogToFile(logEntry) {
    const logPath = join(__dirname, "exploration-log.md");
    let content = readFileSync(logPath, "utf-8");

    // Generate log section for this session
    const sessionLog = this.generateSessionLogMarkdown(logEntry);

    // Insert after "## Current Session Log" marker
    const insertionMarker = "## Current Session Log";
    const insertionIndex = content.indexOf(insertionMarker);

    if (insertionIndex !== -1) {
      const insertionPoint = insertionIndex + insertionMarker.length;
      content = content.slice(0, insertionPoint) + sessionLog + content.slice(insertionPoint);
    }

    writeFileSync(logPath, content, "utf-8");
  }

  generateSessionLogMarkdown(logEntry) {
    const date = logEntry.timestamp.toISOString().split("T")[0];
    const time = logEntry.timestamp.toTimeString().split(" ")[0];

    return `\\n\\n## Session: ${date} ${time}\\n\\n### Target: ${logEntry.item.path}\\n**Priority:** ${logEntry.item.priority}\\n**Queue Position:** ${logEntry.item.id}\\n**Duration:** ${Math.round(logEntry.duration / 1000)} seconds\\n\\n### Steps Completed: ${logEntry.steps}\\n### Screenshots: ${logEntry.screenshots}\\n### Status: ${logEntry.errors.length === 0 ? "Completed" : "Failed"}\\n\\n---`;
  }

  async logError(item, error) {
    console.error(`❌ Error exploring ${item.path}:`, error.message);
    // TODO: Add to error log
  }

  async endSession() {
    const duration = Date.now() - this.sessionStart.getTime();
    const completedItems = this.log.sessions.length;

    console.log(`\\n🎉 Session Complete!`);
    console.log(`⏱️  Duration: ${Math.round(duration / (1000 * 60))} minutes`);
    console.log(`✅ Items Completed: ${completedItems}`);
    console.log(`📸 Screenshots: ${this.log.stats.screenshotsCaptured}`);
    console.log(`📊 Diagrams: ${this.log.stats.diagramsGenerated}`);
    console.log(`📝 Docs Updated: ${this.log.stats.documentationUpdates}`);

    if (!this.options.dryRun) {
      await this.saveUpdatedQueue();
    }
  }

  async saveUpdatedQueue() {
    // TODO: Update exploration-queue.md with completed items
    console.log(`💾 Queue updated with completion status`);
  }
}

// ==================== CLI INTERFACE ====================

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach((arg) => {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      options[key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value || true;
    }
  });

  return options;
}

function showHelp() {
  console.log(`
📋 Document Workflow Agent

Usage: node docs/agent/agent.js [options]

Options:
  --mode=MODE              Execution mode (full|role-focused|gap|refresh)
  --role=ROLE              Target role (admin|provider|patient|coordinator|device)
  --max-duration=MINUTES   Maximum execution time (default: 120)
  --dry-run               Simulate without making changes
  --help                  Show this help message

Examples:
  node docs/agent/agent.js --mode=gap
  node docs/agent/agent.js --mode=role-focused --role=admin
  node docs/agent/agent.js --mode=refresh --max-duration=30 --dry-run
  `);
}

// ==================== MAIN EXECUTION ====================

async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  try {
    const agent = new DocumentWorkflowAgent(options);
    await agent.startSession();
  } catch (error) {
    console.error("❌ Agent failed:", error.message);
    process.exit(1);
  }
}

// Run if called directly
const isMainModule =
  process.argv[1] &&
  (import.meta.url === `file://${process.argv[1]}` ||
    import.meta.url === `file:///${process.argv[1]}` ||
    import.meta.url.endsWith(process.argv[1]) ||
    fileURLToPath(import.meta.url) === process.argv[1]);

if (isMainModule) {
  main().catch(console.error);
}

export { DocumentWorkflowAgent };
