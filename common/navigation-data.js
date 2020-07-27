// NOTE(jim)
// Return the desired navigation entity based on the constructed navigation
// and targetId
export const getCurrentById = (navigation, targetId) => {
  let target = null;
  let activeIds = {};

  const findById = (state, id) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i].id === id) {
        target = state[i];
        activeIds[state[i].id] = true;
      }

      if (!target && state[i].children) {
        activeIds[state[i].id] = true;
        findById(state[i].children, id);

        if (!target) {
          activeIds[state[i].id] = false;
        }
      }
    }
  };

  findById(navigation, targetId);

  return { target, activeIds };
};

// TODO(jim): We don't really need this.
// Remove it at some point.
const constructFilesTreeForNavigation = (library) => {
  return { ...library[0], children: [] };
};

const constructSlatesTreeForNavigation = (slates) => {
  return slates.map((s) => {
    return {
      ...s,
      id: `slate-${s.slatename}`,
      slateId: s.id,
      name: s.slatename,
      pageTitle: `Viewing ${s.slatename}`,
      decorator: "SLATE",
    };
  });
};

export const generate = ({ library = [], slates = [] }) => [
  {
    id: 1,
    name: "Home",
    pageTitle: "Welcome back!",
    decorator: "HOME",
    children: null,
  },
  {
    id: 2,
    name: "Wallet",
    pageTitle: "Your wallet and addresses",
    decorator: "WALLET",
    children: [
      {
        id: 6,
        name: "Deal history",
        pageTitle: "Your deal history",
        decorator: "DEALS",
      },
    ],
  },
  constructFilesTreeForNavigation(library),
  {
    id: 3,
    name: "Slates",
    pageTitle: "Your slates",
    decorator: "SLATES",
    children: constructSlatesTreeForNavigation(slates),
  },
  // TODO(colin):
  // re-enable this when we do local offline.
  {
    id: 4,
    name: "Local",
    pageTitle: "Your local data",
    decorator: "LOCAL_DATA",
    children: [],
    ignore: true,
  },
  {
    id: 5,
    name: "Profile",
    pageTitle: "Your local data",
    decorator: "PROFILE_PAGE",
    children: [],
  },
  {
    id: 13,
    name: "Edit account",
    pageTitle: "your account",
    decorator: "EDIT_ACCOUNT",
    children: null,
    ignore: true,
  },
  {
    id: 14,
    name: "Filecoin Settings",
    pageTitle: "Your hot and cold deal settings.",
    decorator: "SETTINGS",
    children: null,
    ignore: true,
  },
  {
    id: 15,
    name: null,
    pageTitle: "files",
    decorator: "FILE",
    children: null,
    ignore: true,
  },
  {
    id: 16,
    name: "API Key & Tokens",
    pageTitle: "you",
    decorator: "SETTINGS_DEVELOPER",
    children: null,
    ignore: true,
  },
  {
    id: 17,
    name: null,
    pageTitle: "slate",
    decorator: "SLATE",
    children: null,
    ignore: true,
  },
];
