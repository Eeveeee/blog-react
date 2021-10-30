export function fetchPosts() {
  // return fetch(
  //   'https://my-json-server.typicode.com/Eeveeee/posts-db/posts'
  // ).then((response) => response.json());
  return JSON.parse(window.localStorage.getItem('posts'));
}
