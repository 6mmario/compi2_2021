class BST {
    constructor() {
        this.root = null
        this.dot = ''
    }
}

function bst() {
    var bst = new BST()

    bst.dot += `graph ""
    {
    CST0
    CST0 [label = "CST"]
    CST0 -- "EXP1"
    "EXP1" [label = "EXP"]
    EXP1
    EXP1 [label = "EXP"]
    EXP1 -- "DSLASH2"
    "DSLASH2" [label = "//"]
    EXP1 -- "PREDICADO3"
    "PREDICADO3" [label = "PREDICADO"]
    PREDICADO3
    PREDICADO3 [label = "PREDICADO"]
    PREDICADO3 -- "IDENTIFIER4"
    "IDENTIFIER4" [label = "title"]
    PREDICADO3 -- "CORS5"
    "CORS5" [label = "CORS"]
    CORS5
    CORS5 [label = "CORS"]
    CORS5 -- "LCORS6"
    "LCORS6" [label = "["]
    CORS5 -- "EXP7"
    "EXP7" [label = "EXP"]
    EXP7
    EXP7 [label = "EXP"]
    EXP7 -- "NODO8"
    "NODO8" [label = "NODO"]
    NODO8
    NODO8 [label = "NODO"]
    NODO8 -- "AT9"
    "AT9" [label = "@"]
    NODO8 -- "IDENTIFIER10"
    "IDENTIFIER10" [label = "lang"]
    EXP7 -- "ASIG12"
    "ASIG12" [label = "="]
    EXP7 -- "STRINGLITERAL13"
    "STRINGLITERAL13" [label = "en"]
    CORS5 -- "RORS15"
    "RORS15" [label = "]"]
    CST0 -- "SOR19"
    "SOR19" [label = "|"]
    CST0 -- "EXP20"
    "EXP20" [label = "EXP"]
    EXP20
    EXP20 [label = "EXP"]
    EXP20 -- "EXP21"
    "EXP21" [label = "EXP"]
    EXP21
    EXP21 [label = "EXP"]
    EXP21 -- "SLASH22"
    "SLASH22" [label = "/"]
    EXP21 -- "IDENTIFIER23"
    "IDENTIFIER23" [label = "bookstore"]
    EXP20 -- "SLASH25"
    "SLASH25" [label = "/"]
    EXP20 -- "EXP26"
    "EXP26" [label = "EXP"]
    EXP26
    EXP26 [label = "EXP"]
    EXP26 -- "PREDICADO27"
    "PREDICADO27" [label = "PREDICADO"]
    PREDICADO27
    PREDICADO27 [label = "PREDICADO"]
    PREDICADO27 -- "IDENTIFIER28"
    "IDENTIFIER28" [label = "position"]
    PREDICADO27 -- "FUNC29"
    "FUNC29" [label = "FUNC"]
    FUNC29
    FUNC29 [label = "FUNC"]
    FUNC29 -- "LPAREN30"
    "LPAREN30" [label = "("]
    FUNC29 -- "RPAREN31"
    "RPAREN31" [label = ")"]
    EXP26 -- "LT34"
    "LT34" [label = "<"]
    EXP26 -- "INTEGERLITERAL35"
    "INTEGERLITERAL35" [label = "3"]
    CST0 -- "SOR38"
    "SOR38" [label = "|"]
    CST0 -- "EXP39"
    "EXP39" [label = "EXP"]
    EXP39
    EXP39 [label = "EXP"]
    EXP39 -- "DSLASH40"
    "DSLASH40" [label = "//"]
    EXP39 -- "EXP41"
    "EXP41" [label = "EXP"]
    EXP41
    EXP41 [label = "EXP"]
    EXP41 -- "IDENTIFIER42"
    "IDENTIFIER42" [label = "child"]
    EXP41 -- "AXE43"
    "AXE43" [label = "::"]
    EXP41 -- "PREDICADO44"
    "PREDICADO44" [label = "PREDICADO"]
    PREDICADO44
    PREDICADO44 [label = "PREDICADO"]
    PREDICADO44 -- "IDENTIFIER45"
    "IDENTIFIER45" [label = "node"]
    PREDICADO44 -- "FUNC46"
    "FUNC46" [label = "FUNC"]
    FUNC46
    FUNC46 [label = "FUNC"]
    FUNC46 -- "LPAREN47"
    "LPAREN47" [label = "("]
    FUNC46 -- "RPAREN48"
    "RPAREN48" [label = ")"]
    }
    `
    return bst.dot
}