const limitsObj = {
  email: 254,
  password: 16,
  passwordMin: 8,
  passwordEnsure: 16,
  username: 50,
  fileSize: 10,
  filesLimit: 4,
  comment: 2500,
  commentPreview: 300,
  title: 100,
  subtitle: 400,
  subtitlePreview: 150,
  content: 35000,
};
export const limits = { ...limitsObj };
