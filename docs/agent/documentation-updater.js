#!/usr/bin/env node

/**
 * Documentation Updater
 * Intelligently updates documentation files with new workflows and diagrams
 *
 * Version: 1.0
 * Created: March 1, 2026
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

export class DocumentationUpdater {
  constructor(projectRoot, options = {}) {
    this.projectRoot = projectRoot;
    this.options = {
      updateVersions: true,
      updateDates: true,
      backupBeforeEdit: true,
      validateMarkdown: true,
      ...options,
    };

    this.filePaths = {
      workflowDiagrams: join(projectRoot, "docs/latex/workflow-diagrams.md"),
      adminRole: join(projectRoot, "docs/latex/admin-role.md"),
      providerRole: join(projectRoot, "docs/latex/provider-role.md"),
      patientRole: join(projectRoot, "docs/latex/patient-role.md"),
      coordinatorRole: join(projectRoot, "docs/latex/coordinator-role.md"),
      deviceRole: join(projectRoot, "docs/latex/device-role.md"),
      projectWiki: join(projectRoot, "docs/latex/project-wiki.md"),
      screenshotIndex: join(projectRoot, "docs/latex/screenshots/README.md"),
    };

    this.changes = []; // Track all changes made
  }

  /**
   * Update workflow diagrams file with new Mermaid diagram
   * @param {Object} item - Queue item being documented
   * @param {string} mermaidCode - Generated Mermaid diagram
   * @param {Object} metadata - Additional metadata
   * @returns {boolean} Success status
   */
  async updateWorkflowDiagrams(item, mermaidCode, metadata = {}) {
    const filePath = this.filePaths.workflowDiagrams;

    if (!existsSync(filePath)) {
      throw new Error(`Workflow diagrams file not found: ${filePath}`);
    }

    if (this.options.backupBeforeEdit) {
      await this.createBackup(filePath);
    }

    let content = readFileSync(filePath, "utf-8");
    const originalContent = content;

    // Determine section placement
    const sectionInfo = this.findOrCreateSection(content, item);

    // Generate new diagram section
    const diagramSection = this.generateDiagramSection(item, mermaidCode, metadata);

    // Insert or update diagram
    if (sectionInfo.exists) {
      content = this.updateExistingSection(content, sectionInfo, diagramSection);
    } else {
      content = this.insertNewSection(content, sectionInfo, diagramSection);
    }

    // Validate and write
    if (this.options.validateMarkdown) {
      this.validateMarkdown(content);
    }

    writeFileSync(filePath, content, "utf-8");

    this.changes.push({
      file: filePath,
      action: sectionInfo.exists ? "updated" : "added",
      section: sectionInfo.title,
      timestamp: new Date(),
    });

    return true;
  }

  /**
   * Update role-specific documentation
   * @param {Object} item - Queue item being documented
   * @param {Object} artifacts - Generated artifacts (diagrams, screenshots)
   * @returns {boolean} Success status
   */
  async updateRoleDocumentation(item, artifacts) {
    const roleFile = this.filePaths[`${item.role}Role`];

    if (!existsSync(roleFile)) {
      console.warn(`Role file not found: ${roleFile}`);
      return false;
    }

    if (this.options.backupBeforeEdit) {
      await this.createBackup(roleFile);
    }

    let content = readFileSync(roleFile, "utf-8");

    // Find relevant section in role documentation
    const sectionLocation = this.findRoleSection(content, item);

    if (sectionLocation) {
      // Add workflow reference and cross-link to diagram
      const workflowRef = this.generateWorkflowReference(item, artifacts);
      content = this.insertWorkflowReference(content, sectionLocation, workflowRef);

      writeFileSync(roleFile, content, "utf-8");

      this.changes.push({
        file: roleFile,
        action: "updated",
        section: sectionLocation.sectionTitle,
        timestamp: new Date(),
      });
    }

    return true;
  }

  /**
   * Update screenshot index
   * @param {Array} screenshots - List of screenshot filenames
   * @param {Object} item - Queue item
   * @returns {boolean} Success status
   */
  async updateScreenshotIndex(screenshots, item) {
    const indexPath = this.filePaths.screenshotIndex;

    if (!existsSync(indexPath)) {
      console.warn(`Screenshot index not found: ${indexPath}`);
      return false;
    }

    let content = readFileSync(indexPath, "utf-8");

    // Add new screenshots to appropriate role section
    const screenshotEntries = screenshots
      .map((filename) => {
        const description = this.generateScreenshotDescription(filename, item);
        return `| \`${filename}\` | ${description} |`;
      })
      .join("\\n");

    // Find role section in screenshot index
    const roleHeaderPattern = new RegExp(`### ${this.capitalize(item.role)} Role \\((\\d+) screenshots?\\)`, "i");
    const match = content.match(roleHeaderPattern);

    if (match) {
      // Update existing section
      const currentCount = parseInt(match[1]);
      const newCount = currentCount + screenshots.length;
      const newHeader = `### ${this.capitalize(item.role)} Role (${newCount} screenshots)`;

      content = content.replace(roleHeaderPattern, newHeader);

      // Find insertion point (end of role table)
      const sectionEnd = content.indexOf("###", match.index + 1);
      const insertionPoint = sectionEnd !== -1 ? sectionEnd : content.length;

      content = content.slice(0, insertionPoint) + screenshotEntries + "\\n\\n" + content.slice(insertionPoint);
    }

    writeFileSync(indexPath, content, "utf-8");

    this.changes.push({
      file: indexPath,
      action: "updated",
      section: `${item.role} screenshots`,
      timestamp: new Date(),
    });

    return true;
  }

  /**
   * Update version information across all documentation files
   * @returns {boolean} Success status
   */
  async updateVersionInfo() {
    if (!this.options.updateVersions) return true;

    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const filesToUpdate = [
      this.filePaths.workflowDiagrams,
      this.filePaths.adminRole,
      this.filePaths.providerRole,
      this.filePaths.patientRole,
      this.filePaths.coordinatorRole,
      this.filePaths.deviceRole,
      this.filePaths.projectWiki,
    ];

    filesToUpdate.forEach((filePath) => {
      if (!existsSync(filePath)) return;

      let content = readFileSync(filePath, "utf-8");
      let updated = false;

      // Update "Last Updated" date
      if (this.options.updateDates) {
        const datePattern = /\*\*Last Updated:\*\* [^\n]+/g;
        if (datePattern.test(content)) {
          content = content.replace(datePattern, `**Last Updated:** ${currentDate}`);
          updated = true;
        }
      }

      // Increment version numbers
      if (this.options.updateVersions) {
        const versionPattern = /\*\*Version:\*\* (\d+)\.(\d+)/g;
        const match = content.match(versionPattern);
        if (match) {
          const [, major, minor] = match[0].match(/\*\*Version:\*\* (\d+)\.(\d+)/);
          const newMinor = parseInt(minor) + 1;
          const newVersion = `**Version:** ${major}.${newMinor}`;
          content = content.replace(versionPattern, newVersion);
          updated = true;
        }
      }

      if (updated) {
        writeFileSync(filePath, content, "utf-8");
        this.changes.push({
          file: filePath,
          action: "version_updated",
          timestamp: new Date(),
        });
      }
    });

    return true;
  }

  // ==================== SECTION MANAGEMENT ====================

  findOrCreateSection(content, item) {
    const roleTitle = this.capitalize(item.role);
    const featureTitle = this.capitalize(item.feature);
    const areaTitle = this.capitalize(item.area);

    // Look for existing role section
    const roleSectionPattern = new RegExp(`## (\\d+)\\. ${roleTitle} Workflows`, "i");
    const roleSectionMatch = content.match(roleSectionPattern);

    if (roleSectionMatch) {
      // Check for existing subsection
      const subsectionTitle = `${featureTitle} ${areaTitle}`;
      const subsectionPattern = new RegExp(`### (\\d+\\.\\d+) ${subsectionTitle}`, "i");
      const subsectionMatch = content.match(subsectionPattern);

      if (subsectionMatch) {
        return {
          exists: true,
          sectionNumber: roleSectionMatch[1],
          subsectionNumber: subsectionMatch[1],
          title: subsectionTitle,
          insertionPoint: subsectionMatch.index,
        };
      } else {
        // Need to create new subsection
        const nextSubsectionNumber = this.getNextSubsectionNumber(content, roleSectionMatch[1]);
        return {
          exists: false,
          sectionNumber: roleSectionMatch[1],
          subsectionNumber: `${roleSectionMatch[1]}.${nextSubsectionNumber}`,
          title: subsectionTitle,
          insertionPoint: this.findSectionEnd(content, roleSectionMatch.index),
        };
      }
    } else {
      // Need to create new role section
      const nextSectionNumber = this.getNextSectionNumber(content);
      return {
        exists: false,
        sectionNumber: nextSectionNumber,
        subsectionNumber: `${nextSectionNumber}.1`,
        title: `${featureTitle} ${areaTitle}`,
        roleSectionTitle: `${roleTitle} Workflows`,
        insertionPoint: content.length,
      };
    }
  }

  generateDiagramSection(item, mermaidCode, metadata) {
    const sectionInfo = this.findOrCreateSection("", item); // Get section structure
    const title = `### ${sectionInfo.subsectionNumber} ${sectionInfo.title}`;

    const screenshotRef =
      metadata.screenshots && metadata.screenshots.length > 0 ? `> See screenshots: \`workflow-${item.role}-${item.feature}-*.png\`` : "";

    const lines = [title, "", screenshotRef, "", "```mermaid", mermaidCode, "```", ""];

    return lines.filter((line) => line !== null).join("\\n");
  }

  insertNewSection(content, sectionInfo, diagramSection) {
    if (sectionInfo.roleSectionTitle) {
      // Need to create new role section
      const roleSectionHeader = `\\n\\n## ${sectionInfo.sectionNumber}. ${sectionInfo.roleSectionTitle}\\n\\n`;
      const completeSection = roleSectionHeader + diagramSection;
      return content + completeSection;
    } else {
      // Insert subsection within existing role section
      const insertionPoint = sectionInfo.insertionPoint;
      return content.slice(0, insertionPoint) + "\\n" + diagramSection + content.slice(insertionPoint);
    }
  }

  updateExistingSection(content, sectionInfo, diagramSection) {
    // Find the existing section and replace it
    const subsectionPattern = new RegExp(`### ${sectionInfo.subsectionNumber} ${sectionInfo.title}[\\s\\S]*?(?=###|## |$)`, "i");

    return content.replace(subsectionPattern, diagramSection);
  }

  // ==================== ROLE DOCUMENTATION ====================

  findRoleSection(content, item) {
    // Map features to likely section headers in role documentation
    const sectionMappings = {
      admin: {
        users: ["Users", "User Management"],
        "institution-settings": ["Institution Settings"],
        "document-management": ["Document Management"],
        "visit-notes": ["Visit Notes"],
        "data-reporting": ["Data Reporting"],
      },
      provider: {
        dashboard: ["Dashboard"],
        "past-sessions": ["Past Sessions"],
        providers: ["Providers"],
        "my-patients": ["My Patients"],
        calendar: ["Calendar", "Account Settings"],
      },
      coordinator: {
        "command-center": ["Command Center"],
        dashboard: ["Dashboard"],
        "past-sessions": ["Past Sessions"],
      },
      patient: {
        "health-profile": ["Health Profile"],
        "vitals-scan": ["Vitals Scan"],
        dashboard: ["Dashboard"],
      },
      device: {
        dashboard: ["Dashboard"],
      },
    };

    const possibleSections = sectionMappings[item.role]?.[item.feature] || [];

    for (const sectionName of possibleSections) {
      const pattern = new RegExp(`### (.*${sectionName}.*)$`, "im");
      const match = content.match(pattern);
      if (match) {
        return {
          sectionTitle: match[1],
          index: match.index,
          insertionPoint: this.findSubsectionEnd(content, match.index),
        };
      }
    }

    return null;
  }

  generateWorkflowReference(item, artifacts) {
    const diagramRef = `See [workflow diagram](../latex/workflow-diagrams.md#${item.role}-${item.feature}-${item.area})`;
    const screenshotList =
      artifacts.screenshots?.length > 0 ? `\\n\\n**Screenshots:** ${artifacts.screenshots.map((s) => `\`${s}\``).join(", ")}` : "";

    return `\\n\\n**Workflow:** ${diagramRef}${screenshotList}\\n`;
  }

  insertWorkflowReference(content, sectionLocation, workflowRef) {
    // Insert at the end of the section
    const insertionPoint = sectionLocation.insertionPoint;
    return content.slice(0, insertionPoint) + workflowRef + content.slice(insertionPoint);
  }

  // ==================== UTILITIES ====================

  getNextSectionNumber(content) {
    const sectionPattern = /## (\\d+)\\./g;
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

  getNextSubsectionNumber(content, sectionNumber) {
    const subsectionPattern = new RegExp(`### ${sectionNumber}\\.(\\d+)`, "g");
    let maxNumber = 0;
    let match;

    while ((match = subsectionPattern.exec(content)) !== null) {
      const number = parseInt(match[1]);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }

    return maxNumber + 1;
  }

  findSectionEnd(content, sectionStart) {
    // Find the start of the next section or end of document
    const nextSectionIndex = content.indexOf("##", sectionStart + 1);
    return nextSectionIndex !== -1 ? nextSectionIndex : content.length;
  }

  findSubsectionEnd(content, subsectionStart) {
    // Find the start of next subsection/section or end of document
    const patterns = ["###", "##"];
    let nearestIndex = content.length;

    patterns.forEach((pattern) => {
      const index = content.indexOf(pattern, subsectionStart + 1);
      if (index !== -1 && index < nearestIndex) {
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  capitalize(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  generateScreenshotDescription(filename, item) {
    // Extract step information from filename
    // Format: workflow-{role}-{feature}-{step}.png
    const parts = filename.replace(".png", "").split("-");
    const step = parts.pop();

    const stepDescriptions = {
      "01": "Initial navigation",
      "02": "Feature interaction",
      "03": "Form completion",
      "04": "Success confirmation",
      nav: "Navigation step",
      form: "Form interaction",
      success: "Success state",
      error: "Error state",
    };

    return stepDescriptions[step] || `${this.capitalize(item.feature)} workflow step`;
  }

  // ==================== VALIDATION ====================

  validateMarkdown(content) {
    const issues = [];

    // Check for common markdown issues
    const lines = content.split("\\n");

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // Check for malformed links
      const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkPattern.exec(line)) !== null) {
        if (!match[2] || match[2].trim() === "") {
          issues.push(`Line ${lineNumber}: Empty link target`);
        }
      }

      // Check for malformed headers
      if (line.startsWith("#") && !line.match(/^#+\\s/)) {
        issues.push(`Line ${lineNumber}: Malformed header (missing space)`);
      }
    });

    if (issues.length > 0) {
      console.warn(`Markdown validation issues:\\n${issues.join("\\n")}`);
    }

    return issues.length === 0;
  }

  // ==================== BACKUP MANAGEMENT ====================

  async createBackup(filePath) {
    const backupPath = `${filePath}.backup.${Date.now()}`;
    const content = readFileSync(filePath, "utf-8");
    writeFileSync(backupPath, content, "utf-8");
    console.log(`💾 Backup created: ${backupPath}`);
  }

  // ==================== REPORTING ====================

  generateChangeReport() {
    if (this.changes.length === 0) {
      return "No documentation changes made.";
    }

    const report = [
      `📝 Documentation Update Report`,
      `Generated: ${new Date().toISOString()}`,
      `Total Changes: ${this.changes.length}`,
      "",
      "## Files Modified:",
    ];

    const fileChanges = {};
    this.changes.forEach((change) => {
      if (!fileChanges[change.file]) {
        fileChanges[change.file] = [];
      }
      fileChanges[change.file].push(change);
    });

    Object.entries(fileChanges).forEach(([file, changes]) => {
      const filename = file.split("/").pop();
      report.push(`- **${filename}**: ${changes.length} changes`);
      changes.forEach((change) => {
        report.push(`  - ${change.action}: ${change.section || "version info"}`);
      });
    });

    return report.join("\\n");
  }

  getChangesSummary() {
    return {
      total: this.changes.length,
      files: [...new Set(this.changes.map((c) => c.file))].length,
      actions: this.changes.reduce((acc, change) => {
        acc[change.action] = (acc[change.action] || 0) + 1;
        return acc;
      }, {}),
      timestamp: new Date(),
    };
  }
}

// ==================== EXPORT ====================

export default DocumentationUpdater;
