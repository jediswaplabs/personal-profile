module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|mdx)'],
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: "webpack5",
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-contexts/register',
    '@storybook/addon-interactions',
    'storybook-addon-designs',
    'storybook-react-i18next'
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
};
