rules: {
  // ⚠️ Warning'ga aylantirilganlar
  '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
          '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-confusing-void-expression': 'warn',
              '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

                // ✅ Eng ko‘p xato berganlar
                'no-console': 'warn',
                  'react/function-component-definition': 'off',
                    'react/self-closing-comp': 'warn',

                      // 👇 Sening original sozlamalaring qoladi
                      '@typescript-eslint/no-unused-vars': [
                        'warn',
                        {
                          ignoreRestSiblings: true,
                          argsIgnorePattern: '^_',
                          varsIgnorePattern: '^_',
                          caughtErrorsIgnorePattern: '^_',
                        },
                      ],
                        '@typescript-eslint/no-empty-interface': [
                          'warn',
                          {
                            allowSingleExtends: true,
                          },
                        ],
                          '@typescript-eslint/no-shadow': [
                            'warn',
                            {
                              ignoreOnInitialization: true,
                            },
                          ],
                            'import/newline-after-import': 'warn',
                              'react/jsx-uses-react': 'off', // React 17+ uchun kerakmas
                                'react/react-in-jsx-scope': 'off', // NextJS bilan kerakmas

                                  'unicorn/filename-case': 'off',

                                    // Deactivated
                                    '@typescript-eslint/dot-notation': 'off',
                                      '@typescript-eslint/no-misused-promises': 'off',
                                        '@typescript-eslint/no-non-null-assertion': 'off',
                                          '@typescript-eslint/no-unnecessary-condition': 'off',
                                            '@typescript-eslint/require-await': 'off',
                                              '@typescript-eslint/prefer-nullish-coalescing': 'off',
                                                '@typescript-eslint/restrict-template-expressions': [
                                                  'warn',
                                                  {
                                                    allowNumber: true,
                                                  },
                                                ],
                                                  'import/no-default-export': 'off',
                                                    'import/no-extraneous-dependencies': 'off',
                                                      'import/order': 'off',
                                                        'no-nested-ternary': 'off',
                                                          'no-redeclare': 'off',
                                                            'react/jsx-fragments': 'off',
                                                              'react/prop-types': 'off',
                                                                '@next/next/no-img-element': 'off',
}
