#!/usr/bin/env node

/**
 * Mermaid Diagram Generator
 * Converts exploration steps and workflows into Mermaid diagram syntax
 * 
 * Version: 1.0
 * Created: March 1, 2026
 */

export class MermaidGenerator {
  constructor(options = {}) {
    this.options = {
      defaultOrientation: 'TD', // Top Down
      maxNodes: 15,
      nodeNaming: 'descriptive', // vs 'short'
      validateSyntax: true,
      ...options
    };
    
    this.nodeCounter = 0;
    this.nodeMap = new Map(); // Map descriptions to node IDs
  }

  /**
   * Generate a Mermaid flowchart from exploration steps
   * @param {Array} steps - Array of exploration steps
   * @param {Object} metadata - Additional metadata (role, feature, etc.)
   * @returns {string} Mermaid diagram code
   */
  generateFlowchart(steps, metadata = {}) {
    this.resetCounters();
    
    const { orientation = this.options.defaultOrientation } = metadata;
    const nodes = [];
    const connections = [];
    
    let previousNodeId = null;
    
    steps.forEach((step, index) => {
      const nodeId = this.getNextNodeId();
      const nodeLabel = this.formatNodeLabel(step);
      const nodeType = this.determineNodeType(step);
      
      // Create node with appropriate shape
      nodes.push(this.formatNode(nodeId, nodeLabel, nodeType));
      
      // Connect to previous node
      if (previousNodeId) {
        const connectionType = this.determineConnectionType(step);
        connections.push(this.formatConnection(previousNodeId, nodeId, connectionType));
      }
      
      previousNodeId = nodeId;
      
      // Handle decision points (branching)
      if (step.type === 'decision' && step.branches) {
        const branchConnections = this.generateBranches(nodeId, step.branches);
        connections.push(...branchConnections);
        
        // Update previous node to the merge point if applicable
        if (step.mergePoint) {
          previousNodeId = step.mergePoint;
        }
      }
    });
    
    const diagram = this.assembleDiagram(orientation, nodes, connections, metadata);
    
    if (this.options.validateSyntax) {
      this.validateMermaidSyntax(diagram);
    }
    
    return diagram;
  }

  /**
   * Generate a sequence diagram for multi-user workflows
   * @param {Array} interactions - Array of user interactions
   * @param {Object} participants - Participant roles
   * @returns {string} Mermaid sequence diagram
   */
  generateSequenceDiagram(interactions, participants = {}) {
    const lines = ['sequenceDiagram'];
    
    // Add participants
    Object.entries(participants).forEach(([key, label]) => {
      lines.push(`    participant ${key} as ${label}`);
    });
    
    lines.push(''); // Empty line after participants
    
    // Add interactions
    interactions.forEach(interaction => {
      const { from, to, message, type = '->' } = interaction;
      lines.push(`    ${from}${type}${to}: ${message}`);
      
      // Add activation/deactivation if specified
      if (interaction.activate) {
        lines.push(`    activate ${interaction.activate}`);
      }
      if (interaction.deactivate) {
        lines.push(`    deactivate ${interaction.deactivate}`);
      }
    });
    
    return lines.join('\\n');
  }

  /**
   * Generate a state diagram for UI state transitions
   * @param {Array} states - Array of state objects
   * @param {Array} transitions - Array of transition objects
   * @returns {string} Mermaid state diagram
   */
  generateStateDiagram(states, transitions) {
    const lines = ['stateDiagram-v2'];
    
    // Add states
    states.forEach(state => {
      if (state.isStart) {
        lines.push(`    [*] --> ${state.id}: ${state.trigger || ''}`);
      }
      lines.push(`    ${state.id} : ${state.label}`);
      if (state.isEnd) {
        lines.push(`    ${state.id} --> [*]`);
      }
    });
    
    // Add transitions
    transitions.forEach(transition => {
      const { from, to, trigger } = transition;
      lines.push(`    ${from} --> ${to}: ${trigger}`);
    });
    
    return lines.join('\\n');
  }

  // ==================== NODE MANAGEMENT ====================

  resetCounters() {
    this.nodeCounter = 0;
    this.nodeMap.clear();
  }

  getNextNodeId() {
    return String.fromCharCode(65 + this.nodeCounter++); // A, B, C, D...
  }

  formatNodeLabel(step) {
    if (this.options.nodeNaming === 'short') {
      return this.shortenLabel(step.description || step.action);
    }
    
    // Descriptive labels
    switch (step.action) {
      case 'navigate':
        return `Navigate to ${step.target || 'Feature'}`;
      case 'click':
        return `Click ${step.element || 'Element'}`;
      case 'fill':
        return `Enter ${step.field || 'Information'}`;
      case 'select':
        return `Select ${step.option || 'Option'}`;
      case 'upload':
        return `Upload ${step.file || 'File'}`;
      case 'wait':
        return `Wait for ${step.condition || 'Loading'}`;
      case 'verify':
        return `Verify ${step.assertion || 'Result'}`;
      case 'decision':
        return step.question || 'Decision Point';
      default:
        return step.description || step.action || 'Action';
    }
  }

  shortenLabel(text) {
    if (text.length <= 20) return text;
    return text.substring(0, 17) + '...';
  }

  determineNodeType(step) {
    switch (step.action) {
      case 'navigate':
        return 'start';
      case 'decision':
        return 'decision';
      case 'verify':
        return 'end';
      case 'error':
        return 'error';
      default:
        return 'process';
    }
  }

  formatNode(nodeId, label, type) {
    switch (type) {
      case 'start':
        return `${nodeId}([${label}])`;
      case 'decision':
        return `${nodeId}{${label}}`;
      case 'process':
        return `${nodeId}[${label}]`;
      case 'end':
        return `${nodeId}([${label}])`;
      case 'error':
        return `${nodeId}[${label}]`;
      default:
        return `${nodeId}[${label}]`;
    }
  }

  // ==================== CONNECTION MANAGEMENT ====================

  determineConnectionType(step) {
    if (step.action === 'error') {
      return 'error';
    }
    return 'normal';
  }

  formatConnection(from, to, type = 'normal', label = '') {
    switch (type) {
      case 'error':
        return `${from} -.->|Error| ${to}`;
      case 'conditional':
        return `${from} -->|${label}| ${to}`;
      default:
        return `${from} --> ${to}`;
    }
  }

  generateBranches(decisionNodeId, branches) {
    const connections = [];
    
    branches.forEach(branch => {
      const branchNodeId = this.getNextNodeId();
      const branchLabel = branch.condition || branch.label;
      
      connections.push(this.formatConnection(
        decisionNodeId, 
        branchNodeId, 
        'conditional', 
        branchLabel
      ));
      
      // If branch has steps, generate them
      if (branch.steps) {
        let currentNode = branchNodeId;
        branch.steps.forEach(step => {
          const stepNodeId = this.getNextNodeId();
          const stepLabel = this.formatNodeLabel(step);
          connections.push(`${stepNodeId}[${stepLabel}]`);
          connections.push(this.formatConnection(currentNode, stepNodeId));
          currentNode = stepNodeId;
        });
      }
    });
    
    return connections;
  }

  // ==================== DIAGRAM ASSEMBLY ====================

  assembleDiagram(orientation, nodes, connections, metadata = {}) {
    const lines = [`flowchart ${orientation}`];
    
    // Add nodes (with proper indentation)
    nodes.forEach(node => {
      lines.push(`    ${node}`);
    });
    
    lines.push(''); // Empty line between nodes and connections
    
    // Add connections
    connections.forEach(connection => {
      lines.push(`    ${connection}`);
    });
    
    // Add styling if specified in metadata
    if (metadata.styling) {
      lines.push(''); // Empty line before styling
      Object.entries(metadata.styling).forEach(([nodeId, style]) => {
        lines.push(`    classDef ${nodeId} ${style}`);
      });
    }
    
    return lines.join('\\n');
  }

  // ==================== VALIDATION ====================

  validateMermaidSyntax(diagram) {
    const issues = [];
    
    // Check for common syntax errors
    const lines = diagram.split('\\n');
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for unclosed brackets
      const openBrackets = (line.match(/\[/g) || []).length;
      const closeBrackets = (line.match(/\]/g) || []).length;
      if (openBrackets !== closeBrackets) {
        issues.push(`Line ${lineNumber}: Mismatched brackets`);
      }
      
      // Check for invalid node IDs
      const nodeIdPattern = /^\s*([A-Z]+)\[/;
      if (nodeIdPattern.test(line)) {
        const match = line.match(nodeIdPattern);
        if (match[1].length > 3) {
          issues.push(`Line ${lineNumber}: Node ID too long (${match[1]})`);
        }
      }
      
      // Check for invalid arrow syntax
      if (line.includes('->') && !line.includes('-->')) {
        issues.push(`Line ${lineNumber}: Use --> for connections`);
      }
    });
    
    // Check diagram type declaration
    if (!diagram.startsWith('flowchart') && !diagram.startsWith('sequenceDiagram') && !diagram.startsWith('stateDiagram')) {
      issues.push('Missing diagram type declaration');
    }
    
    if (issues.length > 0) {
      throw new Error(`Mermaid syntax validation failed:\\n${issues.join('\\n')}`);
    }
    
    return true;
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Convert Playwright exploration results to workflow steps
   * @param {Object} exploration - Exploration results from agent
   * @returns {Array} Formatted steps for Mermaid generation
   */
  explorationToSteps(exploration) {
    const steps = [];
    
    exploration.steps.forEach(step => {
      // Convert agent exploration step to Mermaid step format
      const mermaidStep = {
        action: step.action,
        description: step.description,
        timestamp: step.timestamp
      };
      
      // Add specific properties based on step type
      switch (step.action) {
        case 'navigate':
          mermaidStep.target = step.url || step.target;
          break;
        case 'click':
          mermaidStep.element = step.element || step.selector;
          break;
        case 'fill':
          mermaidStep.field = step.field || step.input;
          break;
        case 'verify':
          mermaidStep.assertion = step.expected || step.assertion;
          break;
      }
      
      steps.push(mermaidStep);
    });
    
    return steps;
  }

  /**
   * Generate diagram metadata for documentation integration
   * @param {Object} item - Queue item being explored
   * @param {Object} exploration - Exploration results
   * @returns {Object} Metadata for documentation
   */
  generateMetadata(item, exploration) {
    return {
      title: `${this.capitalize(item.role)} ${this.capitalize(item.feature)} ${this.capitalize(item.area)}`,
      sectionNumber: this.determineSectionNumber(item.role),
      screenshotRefs: exploration.screenshots,
      lastUpdated: new Date().toISOString().split('T')[0],
      explorationTime: exploration.duration,
      stepCount: exploration.steps.length
    };
  }

  capitalize(str) {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  determineSectionNumber(role) {
    const sectionMap = {
      'authentication': 1,
      'sessions': 2,
      'admin': 3,
      'coordinator': 4,
      'provider': 5,
      'patient': 6,
      'device': 7,
      'notifications': 8
    };
    
    return sectionMap[role] || 9;
  }
}

// ==================== EXPORT ====================

export default MermaidGenerator;