const hasOwnProperty = Object.prototype.hasOwnProperty;

const objectProto = Object.prototype;

const isPrototype = value => {
    const Ctor = value && value.constructor;
    const proto = (typeof Ctor === "function" && Ctor.prototype) || objectProto;

    return value === proto;
};

// 下划线转换驼峰
const toHump = name => {
    return name.replace(/\_(\w)/g, (all, letter) => {
        return letter.toUpperCase();
    });
};

// 驼峰转换下划线
const toLine = name => {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 *
 * @param {*} value string, null, undefind, [], {}
 */
const isEmpty = value => {
    if (value == null || value === undefined) {
        return true;
    }

    if (Array.isArray(value) || typeof value === "string") {
        return !value.length;
    }

    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }

    for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
};

module.exports = {
    toHump,
    toLine,
    isEmpty
};
