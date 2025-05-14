document.addEventListener('DOMContentLoaded', () => {
    // --- Splash Screen Elements ---
    const splashScreen = document.getElementById('splash-screen');
    const namingScreen = document.getElementById('naming-screen');
    const categoryScreen = document.getElementById('category-screen');
    const requestSentScreen = document.getElementById('request-sent-screen');
    // Reference to the main content area
    const mainContent = document.querySelector('main.page-content'); // Or select the .configurator-container if preferred

    // Naming Screen Inputs/Button
    const designNameInput = document.getElementById('designNameInput');
    const submitDesignNameButton = document.getElementById('submitDesignName');

    const categorySelect = document.getElementById('categorySelect');
    const selectCategoryButton = document.getElementById('selectCategoryButton');

    // Product Title Element
    const productTitleElement = document.getElementById('productTitle');
    const requestQuoteButton = document.getElementById('requestQuoteButton');
    
    // --- DOM Element References ---
    const modelViewport = document.getElementById('modelViewport'); // For 3D model, not directly used by this JS
    const currentPriceDisplay = document.getElementById('currentPrice');
    const optionInfoDisplay = document.getElementById('optionInfoDisplay');

    // Dimension Inputs
    const dimHeightInput = document.getElementById('dimHeight');
    const dimWidthInput = document.getElementById('dimWidth');
    const dimDepthInput = document.getElementById('dimDepth');

    // Material Swatches (radio buttons)
    const materialSwatches = document.querySelectorAll('input[name="material"]');

    // Finish Swatches (radio buttons)
    const finishSwatches = document.querySelectorAll('input[name="finish"]');

    // Hardware Select
    const hardwareSelect = document.getElementById('hardwareStyle');

    // Remarks Textarea
    const remarksTextarea = document.getElementById('remarks'); // Not used in dynamic updates for now

    // Technical Specification Spans
    const specHeightDisplay = document.getElementById('specHeight');
    const specWidthDisplay = document.getElementById('specWidth');
    const specDepthDisplay = document.getElementById('specDepth');
    const specWeightDisplay = document.getElementById('specWeight'); // Weight logic will be simple
    const specMaterialDisplay = document.getElementById('specMaterial');
    const specFinishDisplay = document.getElementById('specFinish');

    // 'Back to Home' is an <a>, handled by HTML
    const anotherDesignButton = document.getElementById('anotherDesignButton');

    // --- Configuration & Pricing Rules ---
    const basePrice = 1000;
    const pricingRules = {
        materials: {
            oak: 0,
            walnut: 200,
            maple: 150,
        },
        finishes: {
            natural: 0,
            dark_stain: 50,
            white_wash: 70,
        },
        hardware: {
            none: 0,
            brass_knob: 30,
            steel_handle: 45,
            black_matte: 40,
        },
        // Price per cm increase over base dimensions (example)
        dimensions: {
            baseHeight: 80, pricePerCmHeight: 2,
            baseWidth: 50, pricePerCmWidth: 1.5,
            baseDepth: 55, pricePerCmDepth: 1,
        }
    };

    let currentConfig = {
        height: parseFloat(dimHeightInput.value),
        width: parseFloat(dimWidthInput.value),
        depth: parseFloat(dimDepthInput.value),
        material: getSelectedRadioValue('material'),
        finish: getSelectedRadioValue('finish'),
        hardware: hardwareSelect.value,
    };

    // --- Helper Functions ---
    function getSelectedRadioValue(name) {
        const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
        return selectedRadio ? selectedRadio.value : null;
    }

    function getSelectedRadioElement(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    // --- Update Functions ---

    function updatePrice() {
        let calculatedPrice = basePrice;

        // Material cost
        calculatedPrice += pricingRules.materials[currentConfig.material] || 0;

        // Finish cost
        calculatedPrice += pricingRules.finishes[currentConfig.finish] || 0;

        // Hardware cost
        calculatedPrice += pricingRules.hardware[currentConfig.hardware] || 0;

        // Dimension cost (example logic)
        if (currentConfig.height > pricingRules.dimensions.baseHeight) {
            calculatedPrice += (currentConfig.height - pricingRules.dimensions.baseHeight) * pricingRules.dimensions.pricePerCmHeight;
        }
        if (currentConfig.width > pricingRules.dimensions.baseWidth) {
            calculatedPrice += (currentConfig.width - pricingRules.dimensions.baseWidth) * pricingRules.dimensions.pricePerCmWidth;
        }
        if (currentConfig.depth > pricingRules.dimensions.baseDepth) {
            calculatedPrice += (currentConfig.depth - pricingRules.dimensions.baseDepth) * pricingRules.dimensions.pricePerCmDepth;
        }

        currentPriceDisplay.textContent = `AUD $${calculatedPrice.toFixed(2)}`;
    }

    function updateTechnicalSpecifications() {
        specHeightDisplay.textContent = currentConfig.height;
        specWidthDisplay.textContent = currentConfig.width;
        specDepthDisplay.textContent = currentConfig.depth;
        specMaterialDisplay.textContent = currentConfig.material.charAt(0).toUpperCase() + currentConfig.material.slice(1);
        specFinishDisplay.textContent = currentConfig.finish.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

        // Example weight calculation (very simplified)
        const baseVolume = pricingRules.dimensions.baseHeight * pricingRules.dimensions.baseWidth * pricingRules.dimensions.baseDepth;
        const currentVolume = currentConfig.height * currentConfig.width * currentConfig.depth;
        const baseWeight = 15; // kg
        const estimatedWeight = (currentVolume / baseVolume) * baseWeight;
        specWeightDisplay.textContent = `Approx. ${estimatedWeight.toFixed(1)}kg`;
    }

    function updateOptionInfo(selectedInputElement) {
        if (selectedInputElement && selectedInputElement.closest('.swatch-item')) {
            const info = selectedInputElement.closest('.swatch-item').dataset.info;
            optionInfoDisplay.innerHTML = info ? `<p>${info}</p>` : '<p>Select an option to see details.</p>';
        } else {
             optionInfoDisplay.innerHTML = '<p>Hover over or select an option to see more details here.</p>';
        }
    }

    // --- 3D Model Update Functions (PLACEHOLDERS) ---
    // You will need to replace these with actual calls to your 3D library
    function update3DModelMaterial(materialValue) {
        console.log(`SIMULATE: Updating 3D model material to: ${materialValue}`);
        // Example with <model-viewer> if you were using it:
        // const modelViewerElement = document.getElementById('productModel');
        // if (modelViewerElement) {
        //     modelViewerElement.variantName = materialValue; // Assuming variants are set up in the model
        // }
    }

    function update3DModelFinish(finishValue) {
        console.log(`SIMULATE: Updating 3D model finish to: ${finishValue}`);
        // This might also be a material variant or a texture change in your 3D model
    }

    function update3DModelDimensions(dimensions) {
        console.log(`SIMULATE: Updating 3D model dimensions: H=${dimensions.height}, W=${dimensions.width}, D=${dimensions.depth}`);
        // This is the most complex 3D update. It might involve:
        // - Scaling parts of the model
        // - Morph targets if your model supports them
        // - Swapping to different pre-scaled models or parts
    }

    function update3DModelHardware(hardwareValue) {
        console.log(`SIMULATE: Updating 3D model hardware to: ${hardwareValue}`);
        // This might involve showing/hiding parts of the 3D model or swapping sub-models
    }

    function triggerAll3DModelUpdates() {
        update3DModelMaterial(currentConfig.material);
        update3DModelFinish(currentConfig.finish); // This might be combined with material
        update3DModelDimensions({
            height: currentConfig.height,
            width: currentConfig.width,
            depth: currentConfig.depth
        });
        update3DModelHardware(currentConfig.hardware);
    }

    function resetConfiguratorUI() {
        // Reset Dimension Inputs to default values from HTML
        dimHeightInput.value = dimHeightInput.defaultValue;
        dimWidthInput.value = dimWidthInput.defaultValue;
        dimDepthInput.value = dimDepthInput.defaultValue;

        // Reset Radio Buttons (Material and Finish) to default checked
        materialSwatches.forEach(radio => {
            if (radio.defaultChecked) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
         finishSwatches.forEach(radio => {
            if (radio.defaultChecked) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });

        // Reset Select Dropdown (Hardware)
        hardwareSelect.value = hardwareSelect.options[0].value; // Set to the first option (None)

        // Clear Remarks Textarea
        remarksTextarea.value = '';

        // Reset Product Title
        productTitleElement.textContent = 'Custom Chair'; // Or a default placeholder

        // Note: You might need to trigger initial price, specs, and 3D updates after resetting,
        // but initializeApp will handle this when the main content is shown again.
    }


    // --- Event Listeners ---

    // Dimensions
    [dimHeightInput, dimWidthInput, dimDepthInput].forEach(input => {
        input.addEventListener('input', (e) => {
            currentConfig[e.target.id.replace('dim', '').toLowerCase()] = parseFloat(e.target.value) || 0;
            updatePrice();
            updateTechnicalSpecifications();
            // For dimensions, we might only want to update the 3D model on 'change' or after a small delay
            // to avoid too many updates while dragging a slider (if it were a slider).
            // For number input, 'input' is fine.
            update3DModelDimensions({ height: currentConfig.height, width: currentConfig.width, depth: currentConfig.depth });
        });
    });

    // Material Swatches
    materialSwatches.forEach(swatch => {
        swatch.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentConfig.material = e.target.value;
                updatePrice();
                updateTechnicalSpecifications();
                updateOptionInfo(e.target);
                update3DModelMaterial(currentConfig.material);
            }
        });
        // Initial info display for checked material (and hover effect)
        const swatchItem = swatch.closest('.swatch-item');
        swatchItem.addEventListener('mouseenter', () => updateOptionInfo(swatch));
        swatchItem.addEventListener('mouseleave', () => updateOptionInfo(getSelectedRadioElement('material') || getSelectedRadioElement('finish'))); // show info of selected on mouseleave
    });

    // Finish Swatches
    finishSwatches.forEach(swatch => {
        swatch.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentConfig.finish = e.target.value;
                updatePrice();
                updateTechnicalSpecifications();
                updateOptionInfo(e.target);
                update3DModelFinish(currentConfig.finish);
            }
        });
        // Initial info display for checked finish (and hover effect)
        const swatchItem = swatch.closest('.swatch-item');
        swatchItem.addEventListener('mouseenter', () => updateOptionInfo(swatch));
        swatchItem.addEventListener('mouseleave', () => updateOptionInfo(getSelectedRadioElement('finish') || getSelectedRadioElement('material'))); // show info of selected on mouseleave
    });

    // Hardware Select
    hardwareSelect.addEventListener('change', (e) => {
        currentConfig.hardware = e.target.value;
        updatePrice();
        // No specific tech spec for hardware in this example, but you could add it
        updateTechnicalSpecifications();
        updateOptionInfo(null); // Clear option info or show specific hardware info if available
        update3DModelHardware(currentConfig.hardware);
    });

    // --- Splash Screen Logic ---

    // Function to hide the splash screen and show main content
    function hideSplashScreenAndShowContent() {
        // Add the fade-out class to the splash screen
        splashScreen.classList.add('fade-out');

        // Listen for the end of the splash screen transition
        splashScreen.addEventListener('transitionend', () => {
            // Once faded, hide it completely
            splashScreen.classList.add('hidden');

            // Prepare naming screen for fade-in: remove display: none
            namingScreen.classList.remove('hidden-display');

            // Trigger fade-in: add the is-visible class
            // Use a small timeout to ensure the browser registers the display change before opacity transition
            setTimeout(() => {
                 namingScreen.classList.add('is-visible');
                 // Set focus to the input field after it's visible
                 designNameInput.focus();
            }, 10); // Small delay

        }, { once: true }); // Use { once: true } to remove the listener after it runs
    }

    // Set a timeout to start the splash screen fade-out after 1 second
    setTimeout(hideSplashScreenAndShowContent, 1000);

    // --- Naming Screen Logic ---

    submitDesignNameButton.addEventListener('click', () => {
        const designName = designNameInput.value.trim();

        if (designName) {
            // Set the product title
            productTitleElement.textContent = designName;

            // Hide the naming screen (start fade out)
            namingScreen.classList.add('fade-out'); // This will set opacity/visibility back to 0/hidden

            // Listen for the end of the naming screen transition
            namingScreen.addEventListener('transitionend', () => {
                // Once faded, hide it completely using display: none
                namingScreen.classList.add('hidden-display');
                // Remove the fade-out class so it's ready for next time (optional but clean)
                namingScreen.classList.remove('fade-out');
                namingScreen.classList.remove('is-visible');
                categoryScreen.classList.remove('hidden-display');

                // Trigger category screen fade-in with delay
                 setTimeout(() => {
                    categoryScreen.classList.add('is-visible');
                    categorySelect.focus(); // Set focus to the select dropdown
                }, 10);

            }, { once: true });

        } else {
            // Handle case where name is empty
            alert('Please enter a name for your design.');
            designNameInput.focus();
        }
    });

    // --- Category Screen Logic ---

    selectCategoryButton.addEventListener('click', () => {
        const selectedCategory = categorySelect.value;

        if (selectedCategory && selectedCategory !== "") { // Check if a valid category is selected
            // You would typically load category-specific data/model here
            console.log(`Category selected: ${selectedCategory}`);

            // Hide the category screen (start fade out)
            categoryScreen.classList.add('fade-out');

            // Listen for the end of the category screen transition
            categoryScreen.addEventListener('transitionend', () => {
                // Once faded, hide it completely using display: none
                categoryScreen.classList.add('hidden-display');
                 // Remove the fade-out class and is-visible class for cleanliness
                categoryScreen.classList.remove('fade-out');
                categoryScreen.classList.remove('is-visible'); // Clean up visibility class


                // NOW show the main content
                // Remove the class that hid the main content (start main content fade in)
                mainContent.classList.remove('content-hidden');

                // Initialize the app *after* the main content is visible
                // You might pass the selectedCategory here in the future
                initializeApp(selectedCategory);

            }, { once: true });

        } else {
            // Handle case where no category is selected
            alert('Please select a category.');
            categorySelect.focus();
        }
    });

    // --- Request Quote Button Logic ---

    requestQuoteButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default form submission if button is inside a form

        // Optional: Gather all currentConfig data to potentially send to server
        console.log("Request Quote Clicked. Current Configuration:", currentConfig);

        // Hide the main content (start fade out)
        // We'll add a class to mainContent to trigger its fade out
        // Ensure the .page-content has a transition defined for opacity/visibility
        mainContent.classList.add('content-hidden'); // This class already handles fade-out

        // Listen for the end of the main content transition
        mainContent.addEventListener('transitionend', () => {
             // Main content is now hidden (opacity 0, visibility hidden)

            // Show the Request Sent screen (start fade in)
            requestSentScreen.classList.remove('hidden-display');
            setTimeout(() => {
                requestSentScreen.classList.add('is-visible');
                // No specific element to focus on this screen usually
            }, 10);

        }, { once: true }); // Use { once: true }

    });

    // --- Request Sent Button ("I Want Another One") Logic ---

    anotherDesignButton.addEventListener('click', () => {
        // Hide the Request Sent screen (start fade out)
        requestSentScreen.classList.add('fade-out');

        // Listen for the end of the Request Sent screen transition
        requestSentScreen.addEventListener('transitionend', () => {
            // Once faded, hide it completely
            requestSentScreen.classList.add('hidden-display');
            // Clean up classes
            requestSentScreen.classList.remove('fade-out');
            requestSentScreen.classList.remove('is-visible');

            // Reset the configurator UI elements to their default state
            resetConfiguratorUI();

            // Show the Naming screen again (start fade in)
            namingScreen.classList.remove('hidden-display');
             setTimeout(() => {
                namingScreen.classList.add('is-visible');
                designNameInput.focus(); // Focus the input field
            }, 10);

        }, { once: true });
    });

    // --- Initialization ---
    function initializeApp() {

        console.log(`Initializing app for category: ${selectedCategory}`); // Log category
        
        currentConfig.height = parseFloat(dimHeightInput.value);
        currentConfig.width = parseFloat(dimWidthInput.value);
        currentConfig.depth = parseFloat(dimDepthInput.value);
        currentConfig.material = getSelectedRadioValue('material');
        currentConfig.finish = getSelectedRadioValue('finish');
        currentConfig.hardware = hardwareSelect.value;

        updatePrice();
        updateTechnicalSpecifications();

        const initiallySelectedMaterial = getSelectedRadioElement('material');
        const initiallySelectedFinish = getSelectedRadioElement('finish');

        if (initiallySelectedMaterial) {
             updateOptionInfo(initiallySelectedMaterial);
        } else if (initiallySelectedFinish) {
            updateOptionInfo(initiallySelectedFinish);
        } else {
            updateOptionInfo(null); // Default message
        }

        triggerAll3DModelUpdates();

        console.log('Configurator Initialized. Current Config:', currentConfig);
        console.log('Note: 3D model updates are simulated in the console.');
    }

    // Event listeners are still attached here, but the initial logic that relies on visible elements waits for initializeApp()


    // --- Existing Event Listeners (These remain here) ---
    // ... (dimension, material, finish, hardware listeners) ...
     [dimHeightInput, dimWidthInput, dimDepthInput].forEach(input => {
        input.addEventListener('input', (e) => {
            currentConfig[e.target.id.replace('dim', '').toLowerCase()] = parseFloat(e.target.value) || 0;
            updatePrice();
            updateTechnicalSpecifications();
            update3DModelDimensions({ height: currentConfig.height, width: currentConfig.width, depth: currentConfig.depth });
        });
    });

    materialSwatches.forEach(swatch => {
        swatch.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentConfig.material = e.target.value;
                updatePrice();
                updateTechnicalSpecifications();
                updateOptionInfo(e.target);
                update3DModelMaterial(currentConfig.material);
            }
        });
        const swatchItem = swatch.closest('.swatch-item');
        swatchItem.addEventListener('mouseenter', () => updateOptionInfo(swatch));
        swatchItem.addEventListener('mouseleave', () => updateOptionInfo(getSelectedRadioElement('material') || getSelectedRadioElement('finish')));
    });

    finishSwatches.forEach(swatch => {
        swatch.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentConfig.finish = e.target.value;
                updatePrice();
                updateTechnicalSpecifications();
                updateOptionInfo(e.target);
                update3DModelFinish(currentConfig.finish);
            }
        });
        const swatchItem = swatch.closest('.swatch-item');
        swatchItem.addEventListener('mouseenter', () => updateOptionInfo(swatch));
        swatchItem.addEventListener('mouseleave', () => updateOptionInfo(getSelectedRadioElement('finish') || getSelectedRadioElement('material')));
    });

    hardwareSelect.addEventListener('change', (e) => {
        currentConfig.hardware = e.target.value;
        updatePrice();
        updateTechnicalSpecifications(); // Ensure this is here
        updateOptionInfo(null);
        update3DModelHardware(currentConfig.hardware);
    });

    // initializeApp();
});