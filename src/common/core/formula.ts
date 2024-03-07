/*@ts-ignore*/
import Formula from '../core/formulajs';

export type Token = {
    token: string,
    type: "VAR" | "NUM" | "OPE",
}

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

    evalFromRPN(tokens: any): number {
        return this.formula.evalFromRPN(tokens);
    }
}