import mix from './helpers/setup';

test.serial('mix.svelte()', t => {
    let response = mix.svelte(
        'resources/assets/svelte/app.svelte',
        'public/js'
    );

    t.is(mix, response);

    t.deepEqual(
        [
            {
                entry: [new File('resources/assets/svelte/app.svelte')],
                output: new File('public/js')
            }
        ],
        Mix.components.get('svelte').toCompile
    );
});

test.serial.cb(
    'it applies the correct extensions and aliases to the webpack config',
    t => {
        mix.svelte(
            'test/fixtures/fake-app/resources/assets/svelte/app.svelte',
            'public/js'
        );

        compile(t, webpackConfig => {
            t.true(webpackConfig.resolve.extensions.includes('.svelte'));
        });
    }
);

test.serial('it applies the correct webpack rules', t => {
    mix.svelte('resources/assets/svelte/app.svelte', 'public/js');

    t.truthy(
        buildConfig().module.rules.find(
            rule => rule.test.toString() === '/\\.(html|svelte)$/'
        )
    );
});

test.serial('it is able to apply options to svelte-loader', t => {
    mix.svelte('resources/assets/svelte/app.svelte', 'public/js', {
        loaderOptionExists: true
    });

    t.truthy(
        buildConfig().module.rules.find(rule => rule.loader === 'svelte-loader')
            .options.loaderOptionExists
    );
});
