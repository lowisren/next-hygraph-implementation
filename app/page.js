// get all pages from hygraph
async function getPages() {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
  if (!HYGRAPH_ENDPOINT) {
    throw new Error("HYGRAPH_ENDPOINT is not defined");
  }
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Pages {
                pages {
                  title
                  slug
                  body {
                    text
                  }
                }
              }`,
    }),
  });
  const json = await response.json();
  return json.data.pages;
}

export default async function Home() {
  const pages = await getPages();
  //console.log(pages);
  return (
          <div className="px-5 mt-10">
                    {pages.map((Page) => (
                        <div key={Page.slug} className="flex flex-col items-center gap-4">
                          <h1 className="text-5xl font-bold">{Page.title}</h1>
                          <p className="text-lg">{Page.body.text}</p>
                          <button class="bg-indigo-500  hover:bg-indigo-700 text-white font-bold py-2 px-4 my-6 rounded"><a href="https://hygraph.com/docs/implementations" target="_blank">Implementation Docs</a></button>
                        </div>
                      ))}
                    </div>
            );
          }
