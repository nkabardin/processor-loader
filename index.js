function applyProcessor(source, processorFunction) {
    return processorFunction(source);
}

module.exports = function (source) {
    var processorsToApply = (this.query || "").replace("?", "")
        .split(",")
        .map(function (p) { return p.trim(); })
        .filter(function (p) { return Boolean(p); });

    if (this.options.processors) {
        for (var i = 0, len = processorsToApply.length; i < len; i++) {
            var processorId = processorsToApply[i];

            if (this.options.processors[processorId]) {
                source = applyProcessor(source, this.options.processors[processorId]);
            }
        }
    }

    return source;
};
