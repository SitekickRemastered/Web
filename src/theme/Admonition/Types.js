import AdmonitionTypeDiscord from '@theme/Admonition/Type/Discord';
import AdmonitionTypeFrantic from '@theme/Admonition/Type/Frantic';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  'discord': AdmonitionTypeDiscord,
  'frantic': AdmonitionTypeFrantic,
};

export default AdmonitionTypes;
