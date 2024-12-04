"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaCouplingBetweenObjects = void 0;
const MetricCalculator_1 = require("../../Core/MetricCalculator");
class JavaCouplingBetweenObjects extends MetricCalculator_1.MetricCalculator {
    calculate(node) {
        let abstractClassCount = 0;
        const calledClasses = this.extractClasses(node);
        const traverse = (currentNode) => {
            // Check if the current node is a class declaration
            if (currentNode.type === 'class_declaration') {
                // Check for the "abstract" modifier in the class declaration
                const modifiers = currentNode.children.find((child) => child.type === 'modifiers');
                if (modifiers && modifiers.children.some((modifier) => modifier.type === 'abstract')) {
                    abstractClassCount++;
                }
            }
            // Continue traversing through child nodes
            if (currentNode.children) {
                for (const child of currentNode.children) {
                    traverse(child);
                }
            }
        };
        // Start traversal from the root node
        traverse(node);
        return calledClasses.size;
    }
    extractClasses(rootNode) {
        const calledClasses = new Set();
        const traverse = (currentNode) => {
            // Check if the current node is a class declaration
            if (currentNode.type === 'class_declaration') {
                // console.log(`${currentNode.text}`);
            }
            // console.log(`${currentNode.text}`);
            // Continue traversing through child nodes
            if (currentNode.children) {
                for (const child of currentNode.children) {
                    traverse(child);
                }
            }
        };
        // Start traversal from the root node
        traverse(rootNode);
        // Return the Set of class names
        return calledClasses;
    }
}
exports.JavaCouplingBetweenObjects = JavaCouplingBetweenObjects;
//   /**
//    * Calculates the ATFD for a specific method.
//    * @param methodNode The method AST node
//    * @param classFields Fields defined within the current class
//    * @param otherClassFields Fields from other classes
//    * @returns The ATFD value for the method
//    */
//   private calculateATFD(methodNode: Node, classFields: Field[], otherClassFields: Field[]): number {
//     let atfdCount = 0;
//     const fieldAccesses = this.findFieldAccesses(methodNode);  // Extract field accesses in the method
//     // Count foreign field accesses
//     fieldAccesses.forEach((fieldAccess) => {
//       if (this.isForeignField(fieldAccess, classFields, otherClassFields)) {
//         atfdCount++;
//       }
//     });
//     return atfdCount;
//   }
//   /**
//    * Find all field accesses in the method node.
//    * @param methodNode The method AST node
//    * @returns A list of field access nodes
//    */
//   private findFieldAccesses(methodNode: Node): Node[] {
//     const fieldAccesses: Node[] = [];
//     const cursor = methodNode.walk();
//     // Traverse the method body looking for field access nodes
//     while (cursor.gotoNextSibling()) {
//       if (cursor.node.type === 'field_access') {
//         fieldAccesses.push(cursor.node);
//       }
//     }
//     return fieldAccesses;
//   }
//# sourceMappingURL=JavaCBO.js.map