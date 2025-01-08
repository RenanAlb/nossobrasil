const url = "http://localhost:8080";

export const createBlog = async (id, nome, formData) => {
  try {
    const response = await fetch(`${url}/blogs/create-blog/${id}/${nome}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro na criação do blog");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar os dados", error);
  }
};

export const getBlogs = async () => {
  try {
    const response = await fetch(`${url}/blogs/get-all-blogs`);

    if (!response.ok) {
      throw new Error("Erro ao buscar os blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar os dados", error);
  }
};

export const getBlogsByCategory = async (category) => {
  try {
    const response = await fetch(`${url}/blogs/get-blogs/${category}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar os blogs");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar os dados", error);
  }
};
