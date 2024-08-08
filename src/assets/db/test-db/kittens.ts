// TBD: customCard, customCardTwo, customCardThree are for testing; delete later

export const customCard = {
  id: '11111111',
  kind: 'custom#card',
  snippet: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publishedAt: '2024-07-25T00:00:00Z',
    tags: ['tag1', 'tag2'],
    thumbnails: {
      default: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
      high: {
        url: 'https://images.ctfassets.net/sfnkq8lmu5d7/1NaIFGyBn0qwXYlNaCJSEl/ad59ce5eefa3c2322b696778185cc749/2021_0825_Kitten_Health.jpg',
      },
    },
    title: 'Test kitten card (not to create a new one every time)',
  },
  statistics: {
    commentCount: '0',
    dislikeCount: '0',
    likeCount: '0',
    viewCount: '0',
  },
};

export const customCardTwo = {
  id: '22222',
  kind: 'custom#card',
  snippet: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publishedAt: '2024-06-25T00:00:00Z',
    tags: ['tag1', 'tag2'],
    thumbnails: {
      default: {
        url: 'https://www.marketplaceveterinary.com/blog/wp-content/uploads/2022/02/iStock-927401870-2000x1335.jpg',
      },
      high: {
        url: 'https://www.marketplaceveterinary.com/blog/wp-content/uploads/2022/02/iStock-927401870-2000x1335.jpg',
      },
    },
    title: 'Test kitten too card (not to create a new one every time)',
  },
  statistics: {
    commentCount: '0',
    dislikeCount: '0',
    likeCount: '0',
    viewCount: '0',
  },
};

export const customCardThree = {
  id: 'oneMoreKittenCardId',
  kind: 'custom#card',
  snippet: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publishedAt: '2024-08-08T00:00:00Z',
    tags: ['tag1', 'tag2'],
    thumbnails: {
      default: {
        url: 'https://www.comfortzone.com/-/media/Project/OneWeb/ComfortZone/Images/Blog/bringing-new-kitten-home.jpg',
      },
      high: {
        url: 'https://www.comfortzone.com/-/media/Project/OneWeb/ComfortZone/Images/Blog/bringing-new-kitten-home.jpg',
      },
    },
    title: 'One more test 🐱 card (just because you like kittens 🙃)',
  },
  statistics: {
    commentCount: '0',
    dislikeCount: '0',
    likeCount: '0',
    viewCount: '0',
  },
};
