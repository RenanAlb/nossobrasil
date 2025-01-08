const url = "https://nossobrasil.onrender.com";

export const createUser = async (email, senha, nome) => {
  try {
    const response = await fetch(`${url}/users/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (email, senha) => {
  try {
    const response = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erro ao criar o usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDadosUser = async (token) => {
  console.log("TOKEN =>", token);
  try {
    const response = await fetch(`${url}/users/dados-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao buscar os dados do usuário");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
