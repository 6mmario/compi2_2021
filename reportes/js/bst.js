class BST {
    constructor() {
        this.root = null
        this.dot = ''
    }
}

function bst() {
    var bst = new BST()

    bst.dot += `
    graph "" 
{
AST0 [label = "AST"]
AST0 -- "EXP1"
"EXP1" [label = "EXP"]
EXP1 [label = "EXP"]
EXP1 -- "DSLASH2"
"DSLASH2" [label = "//"]
EXP1 -- "PREDICADO3"
"PREDICADO3" [label = "PREDICADO"]
PREDICADO3 [label = "PREDICADO"]
PREDICADO3 -- "IDENTIFIER4"
"IDENTIFIER4" [label = "book1"]
PREDICADO3 -- "CORS5"
"CORS5" [label = "CORS"]
CORS5 [label = "CORS"]
CORS5 -- "LCORS6"
"LCORS6" [label = "["]
CORS5 -- "EXP7"
"EXP7" [label = "EXP"]
EXP7 [label = "EXP"]
EXP7 -- "EXP8"
"EXP8" [label = "EXP"]
EXP8 [label = "EXP"]
EXP8 -- "EXP9"
"EXP9" [label = "EXP"]
EXP9 [label = "EXP"]
EXP9 -- "IDENTIFIER10"
"IDENTIFIER10" [label = "year"]
EXP9 -- "ASIG11"
"ASIG11" [label = "="]
EXP9 -- "INTEGERLITERAL12"
"INTEGERLITERAL12" [label = "2003"]
EXP8 -- "OR14"
"OR14" [label = "or"]
EXP8 -- "EXP15"
"EXP15" [label = "EXP"]
EXP15 [label = "EXP"]
EXP15 -- "IDENTIFIER16"
"IDENTIFIER16" [label = "price"]
EXP15 -- "GT17"
"GT17" [label = ">"]
EXP15 -- "INTEGERLITERAL18"
"INTEGERLITERAL18" [label = "40"]
EXP7 -- "OR21"
"OR21" [label = "or"]
EXP7 -- "EXP22"
"EXP22" [label = "EXP"]
EXP22 [label = "EXP"]
EXP22 -- "IDENTIFIER23"
"IDENTIFIER23" [label = "price"]
EXP22 -- "LT24"
"LT24" [label = "<"]
EXP22 -- "INTEGERLITERAL25"
"INTEGERLITERAL25" [label = "30"]
CORS5 -- "RORS28"
"RORS28" [label = "]"]
}
    `
    return bst.dot
}