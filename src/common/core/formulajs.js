
class FormulaJS {

    operator = [
        { op: "+", level: 2, joined: "left" },
        { op: "-", level: 2, joined: "left" },
        { op: "*", level: 3, joined: "left" },
        { op: "/", level: 3, joined: "left" },
        { op: "^", level: 4, joined: "right" },
    ]

    getOpState(str) {
        return this.operator.find(o => o.op == str);
    }

    eval(f) {
        const tokens = this.toTokenArray(f);
        const rpn = this.toReversePolishNotationFromTokens(tokens);
        return rpn;
    }

    toReversePolishNotationFromTokens(tokens) {

        const output = [];
        const stack = [];

        const typeOpe = "OPE";
        const typeVar = "VAR";
        const typeNum = "NUM";

        for (const token of tokens) {

            const op = this.getOpState(token);

            if (token == "(") {
                stack.unshift({ op: "(", level: 0 });
            }
            else if (token == ")") {

                if (!stack.find(op => op.op == "(")) throw "左括弧なし";

                while (stack[0].op != "(") {
                    output.push({ token: stack.shift().op, type: typeOpe });
                }

                stack.shift();
            }
            else if (op) {

                while (stack[0] &&
                     ((stack[0].joined == "left" && op.level <= stack[0].level) || 
                     op.level < stack[0].level)) {
                        output.push({ token: stack.shift().op, type: typeOpe });
                }

                stack.unshift(op);
            }
            else {

                if (/\[.+?\]/.test(token)) {
                    output.push({ token: token.slice(1, token.length - 1), type: typeVar });
                }
                else  {
                    output.push({ token, type: typeNum });
                }
            }

            // console.log(token + "|" + output.join(" ") + "|" + stack.map(o => o.op).join(" "));
        }

        while (stack.length > 0) {
            const token = stack.shift();
            if (token.op == "(" || token.op == ")") throw "括弧エラー";
            output.push({ token: token.op, type: typeOpe });
        }
        
        return output;
    }

    toTokenArray(str) {

        const tokens = [];
        const st = str;
        // const st = str.replace(/\s*/g, "");
        const operatorNames = this.operator.map(o => o.op);

        let buffer = [];
        let inBrackets = false;
        let inComment = false;

        for (let i = 0; i < st.length; i++) {

            const token = st[i];
            const nextToken = st[i + 1];
            
            if (!inComment && `${token}${nextToken}` == "/*") {
                inComment = true;
            }

            if (!inComment) {

                if (token == "[") {
                
                    if (inBrackets) throw "ブラケットエラー";
    
                    inBrackets = true;
                    buffer.push(token);
                }
                else if (token == "]") {
    
                    buffer.push(token);
    
                    if (!inBrackets) throw "ブラケットエラー";
                    if (buffer.length < 3) throw "変数名エラー"; 
    
                    const str = buffer.join("");
                    tokens.push(str);
                    buffer.length = 0;
                    inBrackets = false;
                }
                else if (!inBrackets && (operatorNames.includes(token) || token == "(" || token == ")")) {
    
                    if (buffer.length > 0) {
    
                        const str = buffer.join("");
                        if (!isFinite(str)) throw "正しい数値ではない";
    
                        tokens.push(str);
                        buffer.length = 0;    
                    }
    
                    tokens.push(token);
                }
                else {
                    if (inBrackets || token != " ") {
                        buffer.push(token);
                    }
                }
            }
            
            if (`${token}${nextToken}` == "*/") {
                if (!inComment) throw "コメントが開かれてない";
                inComment = false;
                i++;
            }
        }

        if (inComment) throw "コメントが閉じられてない";

        if (buffer.length > 0) tokens.push(buffer.join(""));

        return tokens;
    }


}

export default FormulaJS;