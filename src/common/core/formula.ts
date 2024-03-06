/*@ts-ignore*/
import Formula from '../core/formulajs';

export class FormulaTS {

    formula: Formula;

    constructor() {
        this.formula = new Formula();
    }

    toReversePolishNotation(formulaText: string) {
        const tokens = this.formula.toTokenArray(formulaText);
        const rpn = this.formula.toReversePolishNotationFromTokens(tokens);
        return rpn;
    }

}