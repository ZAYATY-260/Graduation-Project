"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCMetric = void 0;
const MetricCalculator_1 = require("../../Core/MetricCalculator");
class LOCMetric extends MetricCalculator_1.MetricCalculator {
    calculate(node, sourceCode) {
        const lines = sourceCode.split('\n');
        let inMultiLineComment = false;
        return lines.filter(line => {
            let trimmedLine = line.trim();
            // Handle inline multi-line comments (e.g., /* comment */ int a;)
            while (trimmedLine.includes('/*') && trimmedLine.includes('*/')) {
                const start = trimmedLine.indexOf('/*');
                const end = trimmedLine.indexOf('*/') + 2; // Include '*/'
                trimmedLine = trimmedLine.slice(0, start) + trimmedLine.slice(end);
            }
            // Start of a multi-line comment
            if (trimmedLine.includes('/*')) {
                inMultiLineComment = true;
                trimmedLine = trimmedLine.split('/*')[0]; // Keep code before the comment
            }
            // End of a multi-line comment
            if (inMultiLineComment && trimmedLine.includes('*/')) {
                inMultiLineComment = false;
                trimmedLine = trimmedLine.split('*/')[1] || ''; // Keep code after the comment
            }
            // Skip lines inside multi-line comments
            if (inMultiLineComment) {
                return false;
            }
            // Ignore single-line comments and empty lines
            if (trimmedLine.startsWith('//') || trimmedLine === '') {
                return false;
            }
            // If there is any remaining code, count it as valid
            return trimmedLine.trim() !== '';
        }).length;
    }
}
exports.LOCMetric = LOCMetric;
//# sourceMappingURL=LOCMetric.js.map