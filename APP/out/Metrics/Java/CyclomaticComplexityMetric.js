"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclomaticComplexityMetric = void 0;
const MetricCalculator_1 = require("../../Core/MetricCalculator");
class CyclomaticComplexityMetric extends MetricCalculator_1.MetricCalculator {
    calculate(node) {
        let complexity = 1; // Base complexity starts at 1
        const traverse = (currentNode) => {
            // Increment for each control flow statement
            if ([
                'if_statement',
                'for_statement',
                'while_statement',
                'do_statement',
                'catch_clause',
                'case',
                'throw_statement',
                'break_statement',
                'continue_statement'
            ].includes(currentNode.type)) {
                complexity++;
            }
            // Check guard conditions for boolean operators (&&, ||)
            if (currentNode.type === 'condition') {
                const conditionText = currentNode.text || ''; // Assume 'text' contains the source code of the condition
                const booleanOperators = (conditionText.match(/&&|\|\|/g) || []).length;
                complexity += booleanOperators;
            }
            // Increment for ternary conditional expressions (?:)
            if (currentNode.type === 'ternary_expression') {
                complexity++;
            }
            // Recursively traverse child nodes
            if (currentNode.children) {
                for (const child of currentNode.children) {
                    traverse(child);
                }
            }
        };
        traverse(node);
        return complexity;
    }
}
exports.CyclomaticComplexityMetric = CyclomaticComplexityMetric;
//# sourceMappingURL=CyclomaticComplexityMetric.js.map