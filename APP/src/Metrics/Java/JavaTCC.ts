import Parser from "tree-sitter";
import { MetricCalculator } from '../../Core/MetricCalculator';
import { ExtractComponentsFromCode } from '../../Extractors/ExtractComponentsFromCode';
import {MethodInfo , FieldInfo } from '../../Interface/ParsedComponents';
import { FileParsedComponents } from "../../Interface/FileParsedComponents";


export class TCCCalculation extends MetricCalculator 
{

  calculate(node: any): number 
  {
      const extractcomponentsfromcode = new ExtractComponentsFromCode();
      const Classes = extractcomponentsfromcode.extractClasses(node);
      const methods = extractcomponentsfromcode.extractMethods(node, Classes);
      const Fields = extractcomponentsfromcode.extractFields(node , Classes);
      const TCC  = this.calculateTCC(node, methods, Fields , extractcomponentsfromcode);

      return TCC;
  }


  // Simulate field usage extraction for a method
  private calculateTCC(
    rootNode: Parser.SyntaxNode,
    methods: MethodInfo[],
    fields: FieldInfo[],
    extractcomponentsfromcode: ExtractComponentsFromCode
  ): number {
    let pairs = 0;

    for (let i = 0; i < methods.length; i++) {
      if (!methods[i].isConstructor) {
        const methodA = methods[i];
        const fieldsA = extractcomponentsfromcode.getFieldsUsedInMethod(rootNode, methodA);

        let key = true;
        for (let j = 0; j < methods.length; j++) {
          if (!methods[j].isConstructor && methodA.name !== methods[j].name) {
            const methodB = methods[j];
            const fieldsB = extractcomponentsfromcode.getFieldsUsedInMethod(rootNode, methodB);

            // Check for any shared field
            for (const field of fieldsA) {
              if (fieldsB.includes(field) && key) {
                for (const classfields of fields) {
                  if (classfields.name !== field) {
                    pairs++; // Increment shared connections
                    key = false;
                    break; // Exit as one shared field is enough
                  }
                }
              }
            }
          }
          if (!key) {
            break;
          }
        }
      }
    }

    // Calculate and return TCC
    const nummeth = methods.length;

    const tcc = ((pairs - 1) * pairs) / (nummeth * (nummeth - 1));
     
    if(nummeth === 0 || nummeth=== 1)
    {
        return nummeth;
    }
    else{
      return parseFloat(tcc.toFixed(2));
    }
  }
}
