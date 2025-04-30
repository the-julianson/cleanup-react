const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; // Replace with your key or leave blank to use fallback

const delayFetch = (url, options = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch(url, options));
    }, options.delay || 1500);
  });
};

async function fetchFromUnsplash(topic) {
  const url = `https://api.unsplash.com/photos/random?query=${topic}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const res = await delayFetch(url, { delay: 1000 });
  if (!res.ok) throw new Error(`Unsplash fetch failed for topic: ${topic}`);
  const data = await res.json();
  console.log(data);
  return {
    id: data.id,
    url: data.urls.regular,
    description: data.alt_description || topic,
    user: data.user.name,
  };
}

async function fetchFromPicsum() {
  const id = Math.floor(Math.random() * 1000);
  return {
    id: id,
    url: `https://picsum.photos/600/400?random=${id}`,
    description: "Random image",
    user: "picsum.photos",
  };
}

export async function fetchPhoto(id) {
  const topics = ["mountains", "snowboarding", "motorcycling", "travel"];
  const topic = topics[id % topics.length];
  try {
    if (
      UNSPLASH_ACCESS_KEY &&
      UNSPLASH_ACCESS_KEY !== "YOUR_UNSPLASH_ACCESS_KEY"
    ) {
      const response = await fetchFromUnsplash(topic);
      return { error: null, response };
    } else {
      const response = await fetchFromPicsum();
      console.log(response);
      return { error: null, response };
    }
  } catch (e) {
    return { error: e, response: null };
  }
}
