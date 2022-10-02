const StaggerContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};



const loadingCircleVariants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

const cardListVariants = {
  start: {
    y: '100%',
    transition: {
      duration: 0.5,
    },
  },
  end: {
    y: '0%',
  },
};

export {
  StaggerContainerVariants,

  loadingCircleVariants,
  cardListVariants,
};
