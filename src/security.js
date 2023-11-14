export function requiredValue(value, property){
        if (value == null || value == undefined)
            throw new Error(`ERROR: el campo "${property}" es obligatorio.`)
        return value
    }

export function notNegativeValue(value){
        if (value < 0)
            throw new Error(`ERROR: ingreso un valor negativo`)
        return value
    }

export function requiredPositiveValue(value,property){
        return this.notNegativeValue(this.requiredValue(value,property))
    }
