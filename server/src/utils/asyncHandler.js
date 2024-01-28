const asyncHandler = async (asyncFn) => {
  try {
    return await asyncFn(req, res, next);
  } catch (error) {
    console.error(error);
  }
};
