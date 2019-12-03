let JavaScript = require('./JavaScript');

class Svelte extends JavaScript {
    constructor() {
        super();
        this.options = {};
    }

    /**
     * The API name for the component.
     */
    name() {
        return ['svelte'];
    }

    /**
     * Register the component.
     *
     * @param {*} entry
     * @param {string} output
     * @param {object} options
     */
    register(entry, output, options = {}) {
        super.register(entry, output);
        this.options = options;
    }

    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['svelte', 'svelte-loader'].concat();
    }

    /**
     * webpack rules to be appended to the master config.
     */
    webpackRules() {
        return [].concat(super.webpackRules(), {
            test: /\.(html|svelte)$/,
            loader: 'svelte-loader',
            exclude: /node_modules/,
            options: Object.assign(
                {},
                { emitCss: true, hotReload: true },
                this.options
            )
        });
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param {Object} config
     */
    webpackConfig(config) {
        super.webpackConfig(config);

        config.resolve.extensions.push('.svelte');
        config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
        config.resolve.alias['svelte'] = 'svelte';
    }
}

module.exports = Svelte;
