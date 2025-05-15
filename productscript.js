// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'; 
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

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
    const basePrice = 1999;
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
    function initializeApp(selectedCategory) {

        console.log(`Initializing app for category: ${selectedCategory}`); // Log category

        let scene, camera, renderer, model, orbitControls;
        const modelViewport = document.getElementById('modelViewport');
        let animationFrameId = null; // To keep track of the animation loop

        function init3DScene() {
            // 1. Create Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xe7e2dc); // Match viewer-column background

            // 2. Create Camera
            camera = new THREE.PerspectiveCamera(75, modelViewport.clientWidth / modelViewport.clientHeight, 0.1, 1000);
            camera.position.set(2, 2, 2); // Set camera position

            // 3. Create Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(modelViewport.clientWidth, modelViewport.clientHeight);
            // Clear the placeholder text and append the renderer's canvas
            modelViewport.innerHTML = ''; // Remove placeholder text
            modelViewport.appendChild(renderer.domElement);
            renderer.setPixelRatio(window.devicePixelRatio); // For high-res displays

            // 4. Add Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft white light
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            // 5. Add Orbit Controls
            orbitControls = new OrbitControls(camera, renderer.domElement);
            orbitControls.enableDamping = true; // Smooth camera movement
            orbitControls.dampingFactor = 0.25;
            orbitControls.screenSpacePanning = false;
            // Optional: Limit rotation/zoom if needed

            // 6. Handle Window Resizing
            window.addEventListener('resize', onWindowResize, false);
            function onWindowResize() {
                camera.aspect = modelViewport.clientWidth / modelViewport.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(modelViewport.clientWidth, modelViewport.clientHeight);
            }

            // 7. Start Animation Loop
            function animate() {
                animationFrameId = requestAnimationFrame(animate);
                orbitControls.update(); // Update controls
                renderer.render(scene, camera); // Render the scene
            }
            animate();

            // Call model loading after scene is set up
            load3DModel('path/to/your/default_chair_model.glb'); // <<< Specify your model path
        }

        // --- NEW: Model Loading Function ---
        function load3DModel(modelPath) {
            const loader = new GLTFLoader();
            loader.load(modelPath, (gltf) => {
                model = gltf.scene; // Store the loaded model
                scene.add(model); // Add model to the scene

                // Optional: Center the model, adjust camera to fit etc.
                 const bbox = new THREE.Box3().setFromObject(model);
                 const center = bbox.getCenter(new THREE.Vector3());
                 const size = bbox.getSize(new THREE.Vector3());
                 const maxDim = Math.max(size.x, size.y, size.z);
                 const fov = camera.fov * (Math.PI / 180);
                 let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                 cameraZ *= 1.5; // Add some buffer
                 camera.position.set(center.x + cameraZ, center.y + cameraZ, center.z + cameraZ); // Position camera
                 camera.lookAt(center); // Point camera at center

                 orbitControls.target.copy(center); // Set controls target
                 orbitControls.update(); // Update controls


                console.log('3D Model loaded:', model);
                // NOW you can find parts of the model to update based on initial config
                triggerAll3DModelUpdates(); // Update model based on initial config
            }, undefined, (error) => {
                console.error('An error occurred loading the 3D model:', error);
                modelViewport.innerHTML = '<p class="placeholder-text" style="color: red;">Error loading 3D model.</p>';
            });
        }

        // --- Clean up Three.js scene when navigating away or resetting ---
        // This is important to prevent memory leaks if the configurator is re-initialized
        // (e.g., when clicking "I Want Another One")
        function dispose3DScene() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (renderer) {
                renderer.dispose();
                if (renderer.domElement.parentNode) {
                    renderer.domElement.parentNode.removeChild(renderer.domElement);
                }
            }
            // Dispose of geometry and materials in the scene if necessary
             scene.traverse((object) => {
                 if (!object.isMesh) return;
                 if (object.geometry) object.geometry.dispose();
                 if (object.material) {
                     if (Array.isArray(object.material)) {
                         object.material.forEach(material => material.dispose());
                     } else {
                         object.material.dispose();
                     }
                 }
             });
             scene = null; // Clear the scene
             model = null; // Clear the model reference
             orbitControls = null;
             window.removeEventListener('resize', onWindowResize); // Remove listener
        }


        // --- Existing Initialization Logic ---
        // This runs when the main configurator page becomes visible

        // *** Important: If initializeApp is called multiple times (like from "I Want Another One"),
        // you should call dispose3DScene() first to clean up the previous scene.
        // Add a check or structure your code to handle re-initialization.
        // For now, assuming initializeApp is called only once when mainContent first becomes visible.


        init3DScene(); // Initialize the 3D scene
        
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

    // --- NEW: Update 3D Model Functions (Implement Three.js logic) ---

    // Note: You'll need to find specific parts (meshes) of your loaded model
    // by name or by traversing the scene graph. This depends on your model's structure.

    function update3DModelMaterial(materialValue) {
        console.log(`Updating 3D model material to: ${materialValue}`);
        if (!model) { console.warn("3D model not loaded yet."); return; }

        // Example: Find a mesh named 'Chair_Frame' and change its color
        const chairFrame = model.getObjectByName('Chair_Frame'); // <<< Replace 'Chair_Frame'
        if (chairFrame && chairFrame.isMesh) {
            let materialColor;
            switch (materialValue) {
                case 'oak': materialColor = new THREE.Color(0xD0B49F); break;
                case 'walnut': materialColor = new THREE.Color(0x6F5B4B); break;
                case 'maple': materialColor = new THREE.Color(0xF3E5AB); break;
                default: materialColor = new THREE.Color(0xD0B49F); // Default to oak color
            }
             if (chairFrame.material) {
                 // Assuming a MeshStandardMaterial or similar PBR material
                 if (Array.isArray(chairFrame.material)) {
                      // Handle multi-material if necessary, e.g., chairFrame.material[0].color = materialColor;
                 } else {
                     chairFrame.material.color = materialColor;
                     // If using textures, you might swap texture maps here
                     // chairFrame.material.map = textureLoader.load(`path/to/${materialValue}_texture.jpg`);
                     chairFrame.material.needsUpdate = true; // Tell Three.js material changed
                 }
             }
        }
    }

    function update3DModelFinish(finishValue) {
        console.log(`Updating 3D model finish to: ${finishValue}`);
        if (!model) { console.warn("3D model not loaded yet."); return; }

        // This logic depends heavily on how finishes are applied in your model.
        // It might involve swapping textures, adjusting material properties,
        // or using glTF material variants if your loader supports them.

        // Example (Simplified: Just change shininess/roughness based on finish type)
         const affectedParts = []; // <<< Array of mesh names affected by finish
         model.traverse((o) => {
             if (o.isMesh && affectedParts.includes(o.name)) {
                 if (o.material && !Array.isArray(o.material) && o.material.isMeshStandardMaterial) {
                     switch (finishValue) {
                         case 'natural':
                             o.material.roughness = 0.8; // More matte
                             o.material.metalness = 0;
                             break;
                         case 'dark_stain':
                             o.material.roughness = 0.6; // Slightly less matte
                             o.material.metalness = 0;
                             // You might also adjust the color/texture blend here
                             break;
                         case 'white_wash':
                            o.material.roughness = 0.7;
                            o.material.metalness = 0;
                            // Adjust color/texture blend
                            break;
                         default: // Natural
                            o.material.roughness = 0.8;
                            o.material.metalness = 0;
                     }
                     o.material.needsUpdate = true;
                 }
             }
         });
         // If using glTF variants, you'd use something like:
         // if (gltf && gltf.functions && gltf.functions.selectVariant) {
         //     gltf.functions.selectVariant(finishValue); // Assuming variants match finish names
         // }
    }

    function update3DModelDimensions(dimensions) {
        console.log(`Updating 3D model dimensions: H=${dimensions.height}, W=${dimensions.width}, D=${dimensions.depth}`);
        if (!model) { console.warn("3D model not loaded yet."); return; }

        // This is the most complex part and depends entirely on your model's structure
        // and how you want dimensions to affect it.

        // VERY SIMPLIFIED Example: Scale the entire model (likely not desired)
        // model.scale.set(dimensions.width / baseWidth, dimensions.height / baseHeight, dimensions.depth / baseDepth); // Need base dimensions

        // Example: Scale specific parts - Requires knowing your model's hierarchy!
        // Find the chair legs and scale them vertically
        // const legs = model.getObjectByName('Chair_Legs'); // <<< Replace 'Chair_Legs'
        // if(legs) {
        //     const baseHeight = pricingRules.dimensions.baseHeight; // Get base height from pricing rules
        //     legs.scale.y = dimensions.height / baseHeight;
        //     legs.needsUpdate = true;
        //     // You might also need to reposition other parts connected to the legs
        // }

        // Example: Scale the seat width/depth
        // const seat = model.getObjectByName('Chair_Seat'); // <<< Replace 'Chair_Seat'
        // if(seat) {
        //     const baseWidth = pricingRules.dimensions.baseWidth;
        //     const baseDepth = pricingRules.dimensions.baseDepth;
        //     seat.scale.x = dimensions.width / baseWidth;
        //     seat.scale.z = dimensions.depth / baseDepth;
        //     seat.needsUpdate = true;
        //     // You might also need to reposition armrests, back, etc.
        // }

        // This part requires custom logic based on your specific model.
        // You might need to load different model parts, use morph targets, or procedurally adjust geometry.
        // Start simple: Maybe just scale one identifiable part first.
    }

    function update3DModelHardware(hardwareValue) {
        console.log(`Updating 3D model hardware to: ${hardwareValue}`);
        if (!model) { console.warn("3D model not loaded yet."); return; }

        // Assuming hardware parts are separate meshes you can find by name
        // You would show/hide specific hardware parts here.

        // Example: Hide all hardware first, then show the selected one
        const allHardwareParts = ['Brass_Knob_Mesh', 'Steel_Handle_Mesh', 'Black_Matte_Mesh']; // <<< List names of hardware meshes
        allHardwareParts.forEach(partName => {
            const part = model.getObjectByName(partName);
            if (part) {
                part.visible = false; // Hide all
            }
        });

        if (hardwareValue !== 'none') {
            let selectedHardwareMeshName = '';
             switch (hardwareValue) {
                case 'brass_knob': selectedHardwareMeshName = 'Brass_Knob_Mesh'; break;
                case 'steel_handle': selectedHardwareMeshName = 'Steel_Handle_Mesh'; break;
                case 'black_matte': selectedHardwareMeshName = 'Black_Matte_Mesh'; break;
             }
             const selectedPart = model.getObjectByName(selectedHardwareMeshName);
             if (selectedPart) {
                 selectedPart.visible = true; // Show the selected one
             }
        }
    }

    function triggerAll3DModelUpdates() {
        console.log("Triggering all 3D model updates...");
         // These functions will now contain Three.js logic to update the model
        update3DModelMaterial(currentConfig.material);
        update3DModelFinish(currentConfig.finish);
        update3DModelDimensions({ height: currentConfig.height, width: currentConfig.width, depth: currentConfig.depth });
        update3DModelHardware(currentConfig.hardware);
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
});