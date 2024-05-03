// state...

const saveRecipe = async (e) => {
  e.preventDefault();

  try {
    const fileUploadRes = await fetch(`${backendUrl}/api/v1/files`, {
      method: "POST",
      body: formData,
    });
    const { fileName } = await fileUploadRes.json();
    const newRecipe = {
      // ...
      bildUrl: fileName,
    };
    const res = await fetch(`${backendUrl}/api/v1/recipies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    const data = await res.json();
    // ... mit data weiterarbeiten zb setState(data);
  } catch (err) {
    console.log(err);
    // ... err handling
  }
};
