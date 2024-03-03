        async function handleGenerateRecipe() {
            const ingredients = document.getElementById('food_class').value;
            const generating = document.querySelector('.generating');
            const generate_text = document.querySelector('.generate_text');
            const generate_btn = document.querySelector('.generate_btn');
            var loader = false;
            
            if (ingredients !== '') {
                try {
                    loader = true;
                    generating.classList.add('show_generating');
                    generate_text.classList.add('generating');
                    generate_btn.disabled = loader;
                    generate_btn.style.cursor = 'no-drop';
                    generate_btn.style.opacity = '0.5';

                    const response = await fetch('https://api.api-ninjas.com/v1/recipe?query=' + ingredients, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'Mq1h2LLzdN1YdR5Ibwl/4g==FVWP4p1CVh3CNqXN',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    const data = await response.json();
                    console.log('Recipe Data :', data);

                    const recipeContainer = document.getElementById('recipe');

                    // Clear previous recipes only if data is available
                    if (data.length > 0) {
                        recipeContainer.innerHTML = '';
                        Toastify({
                            text: 'Recipes Generated Successfully!',
                            duration: 3000,
                            newWindow: true,
                            close: false,
                            gravity: 'top',
                            position: 'center',
                            stopOnFocus: true,
                            style: {
                                background: '#52AB6E',
                            },
                            onClick: function () { },
                        }).showToast();
                    }

                    if (data.length === 0) {
                        // Optionally display a message if no recipes are found
                        loader = false;

                        generating.classList.remove('show_generating');
                        generate_text.classList.remove('generating');
                        generate_btn.disabled = loader;
                        generate_btn.style.cursor = 'pointer';
                        generate_btn.style.opacity = '1';

                        console.log('No recipes found');

                        Toastify({
                            text: "Uhh Ohh, No recipes found!",
                            duration: 3000,
                            newWindow: true,
                            close: false,
                            gravity: "top",
                            position: "center",
                            stopOnFocus: true,
                            style: {
                                background: "#de3f53",
                            },
                            onClick: function () { }
                        }).showToast();
                        return;
                    }

                    data.forEach((recipe) => {
                        const recipeDiv = document.createElement('div');
                        recipeDiv.classList.add('recipe');

                        const title = document.createElement('h2');
                        title.textContent = recipe.title;
                        recipeDiv.appendChild(title);

                        const ingredients = document.createElement('p');
                        ingredients.innerHTML = '<b>Ingredients:</b> <span class="recipe-ingredients">' + recipe.ingredients + '</span>';
                        recipeDiv.appendChild(ingredients);

                        const servings = document.createElement('p');
                        servings.innerHTML = '<b>Servings:</b> <span class="recipe-servings">' + recipe.servings + '</span>';
                        recipeDiv.appendChild(servings);

                        const instructions = document.createElement('p');
                        instructions.innerHTML = '<b>Instructions:</b> <span class="recipe-instructions">' + recipe.instructions + '</span>';
                        recipeDiv.appendChild(instructions);

                        recipeContainer.appendChild(recipeDiv);
                    });


                    // Show the recipe container after data retrieval
                    recipeContainer.style.display = 'block';
                    loader = false;

                    generating.classList.remove('show_generating');
                    generate_text.classList.remove('generating');
                    generate_btn.disabled = loader;
                    generate_btn.style.cursor = 'pointer';
                    generate_btn.style.opacity = '1';

                } catch (error) {
                    console.error('Error:', error.message);
                    // Optionally display an error message to the user if there is network issue
                    loader = false;

                    generating.classList.remove('show_generating');
                    generate_text.classList.remove('generating');
                    generate_btn.disabled = loader;
                    generate_btn.style.cursor = 'pointer';
                    generate_btn.style.opacity = '1';

                    Toastify({
                        text: 'Failed to generate recipe. Please try again later.',
                        duration: 3000,
                        newWindow: true,
                        close: false,
                        gravity: 'top',
                        position: 'center',
                        stopOnFocus: true,
                        style: {
                            background: '#FF6347',
                        },
                        onClick: function () { },
                    }).showToast();
                }
            } else {
                Toastify({
                    // if no ingredient is selected
                    text: "C'omon, you need to add a food class",
                    duration: 3000,
                    newWindow: true,
                    close: false,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "#FF6347",
                    },
                    onClick: function () { }
                }).showToast();
            }
        }
