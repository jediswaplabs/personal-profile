import * as deepcopy from 'deepcopy';

const defaultGuildsList = {
  ids: ['design', 'development', 'community', 'growth', 'content'],
  entities: {
    design: {
      id: 'design',
      name: 'Design',
      score: null,
    },
    development: {
      id: 'development',
      name: 'Development',
      score: null,
    },
    community: {
      id: 'community',
      name: 'Community',
      score: null,
    },
    growth: {
      id: 'growth',
      name: 'Growth',
      score: null,
    },
    content: {
      id: 'content',
      name: 'Content Writing',
      score: null,
    },
  },
};

const emptyGuildsList = [];

const guildsListWithScore = deepcopy(defaultGuildsList);

guildsListWithScore.entities[guildsListWithScore.ids[0]].score = 100;
guildsListWithScore.entities[guildsListWithScore.ids[3]].score = 200;

export {
  defaultGuildsList,
  emptyGuildsList,
  guildsListWithScore,
};
