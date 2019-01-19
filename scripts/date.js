const makeDate = function () {
    const d = new Date();
    var formatDate = "";

    formatDate += (d.getMonth() + 1) + "_";

    formatDate += d.getDate() + "_";

    formatDate += d.getFullYear();

    return formatedDate;
}

module.exports = makeDate;