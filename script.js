document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const homePage = document.getElementById("home-page");
    const instructionsPage = document.getElementById("instructions-page");
    const testPage = document.getElementById("test-page");
    const reviewPage = document.createElement("div");
    const userMatric = document.getElementById("user-matric");
    const userMatricTest = document.getElementById("user-matric-test");
    const startTestBtn = document.getElementById("start-test");
    const questionText = document.getElementById("question-text");
    const optionsDiv = document.getElementById("options");
    const questionIconsDiv = document.getElementById("question-icons");
    const saveButton = document.getElementById("save");
    const submitButton = document.getElementById("submit-test");
    const timerDisplay = document.createElement("div");

    let currentQuestion = 1;
    const totalQuestions = 30;
    let timeLeft = 15 * 60;
    let timerInterval;
    const answers = {};
    let selectedQuestions = [];

    const allQuestions = [
        { 
            type: "mcq", 
            question: "Which of the following best describes the scope of biology?", 
            options: [
                "A) Study of non-living systems", 
                "B) Study of living organisms and their interactions with the environment", 
                "C) Study of human behavior only", 
                "D) Study of chemical compounds exclusively"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is NOT a universal characteristic of living organisms?", 
            options: [
                "A) Cellular organization", 
                "B) Reproduction", 
                "C) Ability to move voluntarily", 
                "D) Metabolism"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which career field is most directly associated with applying biological research to human welfare?", 
            options: [
                "A) Astrophysics", 
                "B) Biotechnology", 
                "C) Mechanical Engineering", 
                "D) Geology"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which taxonomic rank is considered the basic unit of classification?", 
            options: [
                "A) Kingdom", 
                "B) Family", 
                "C) Genus", 
                "D) Species"
            ], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "Modern classification of organisms primarily relies on which of the following?", 
            options: [
                "A) Morphological characteristics alone", 
                "B) Genetic and molecular data", 
                "C) Behavioral traits exclusively", 
                "D) Geographical distribution only"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is primarily responsible for ATP production in eukaryotic cells?", 
            options: [
                "A) Chloroplast", 
                "B) Mitochondrion", 
                "C) Ribosome", 
                "D) Endoplasmic Reticulum"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which structure is found in plant cells but not in animal cells?", 
            options: [
                "A) Mitochondria", 
                "B) Cell wall", 
                "C) Nucleus", 
                "D) Ribosome"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which process is responsible for generating genetic variation during sexual reproduction?", 
            options: [
                "A) Mitosis", 
                "B) Binary fission", 
                "C) Meiosis", 
                "D) Budding"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "In an ecosystem, which of the following is an abiotic factor?", 
            options: [
                "A) Predation", 
                "B) Temperature", 
                "C) Competition", 
                "D) Parasitism"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which feature distinguishes animals from plants?", 
            options: [
                "A) Heterotrophic nutrition", 
                "B) Presence of chlorophyll", 
                "C) Cell wall made of cellulose", 
                "D) Ability to perform photosynthesis"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which group of organisms is considered non-vascular?", 
            options: [
                "A) Ferns", 
                "B) Mosses", 
                "C) Conifers", 
                "D) Flowering plants"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In flowering plants, which structure develops into a fruit after fertilization?", 
            options: [
                "A) Stamen", 
                "B) Petal", 
                "C) Ovary", 
                "D) Sepal"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which process in flowering plants involves the transfer of pollen from the anther to the stigma?", 
            options: [
                "A) Fertilization", 
                "B) Germination", 
                "C) Pollination", 
                "D) Photosynthesis"
            ], 
            answer: "C" 
        },

        { 
            type: "mcq", 
            question: "Which organelle is known as the powerhouse of the cell?", 
            options: [
                "A) Chloroplast", 
                "B) Mitochondrion", 
                "C) Golgi apparatus", 
                "D) Lysosome"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is responsible for protein synthesis?", 
            options: [
                "A) Ribosome", 
                "B) Endoplasmic Reticulum", 
                "C) Golgi apparatus", 
                "D) Lysosome"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is found in plant cells but absent in animal cells?", 
            options: [
                "A) Mitochondrion", 
                "B) Chloroplast", 
                "C) Ribosome", 
                "D) Lysosome"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is primarily involved in lipid synthesis and detoxification?", 
            options: [
                "A) Rough Endoplasmic Reticulum", 
                "B) Golgi apparatus", 
                "C) Smooth Endoplasmic Reticulum", 
                "D) Peroxisome"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is responsible for packaging and sorting proteins for secretion?", 
            options: [
                "A) Nucleus", 
                "B) Lysosome", 
                "C) Golgi apparatus", 
                "D) Endoplasmic Reticulum"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is the primary site of cellular respiration?", 
            options: [
                "A) Mitochondrion", 
                "B) Chloroplast", 
                "C) Nucleus", 
                "D) Ribosome"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the main function of lysosomes in a cell?", 
            options: [
                "A) Protein synthesis", 
                "B) Energy production", 
                "C) Digestion of macromolecules", 
                "D) Lipid synthesis"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which of the following organelles is bounded by a double membrane?", 
            options: [
                "A) Ribosome", 
                "B) Mitochondrion", 
                "C) Lysosome", 
                "D) Peroxisome"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In plant cells, which organelle is responsible for ATP production via photosynthesis?", 
            options: [
                "A) Mitochondrion", 
                "B) Chloroplast", 
                "C) Golgi apparatus", 
                "D) Smooth Endoplasmic Reticulum"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which component of the cytoskeleton is crucial for maintaining cell shape and aiding in cell motility?", 
            options: [
                "A) Microtubules", 
                "B) Ribosomes", 
                "C) Lysosomes", 
                "D) Peroxisomes"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the primary function of the nucleolus within the nucleus?", 
            options: [
                "A) DNA replication", 
                "B) Assembly of ribosomal subunits", 
                "C) Protein packaging", 
                "D) Lipid synthesis"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is primarily involved in the synthesis of secretory proteins?", 
            options: [
                "A) Rough Endoplasmic Reticulum", 
                "B) Smooth Endoplasmic Reticulum", 
                "C) Golgi apparatus", 
                "D) Lysosome"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which structure regulates the movement of substances into and out of the cell?", 
            options: [
                "A) Plasma membrane", 
                "B) Cell wall", 
                "C) Nuclear envelope", 
                "D) Endoplasmic Reticulum"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which organelle contains enzymes that carry out beta-oxidation of fatty acids?", 
            options: [
                "A) Mitochondrion", 
                "B) Peroxisome", 
                "C) Smooth Endoplasmic Reticulum", 
                "D) Golgi apparatus"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What structure is responsible for transporting proteins from the endoplasmic reticulum to the Golgi apparatus?", 
            options: [
                "A) Vesicles", 
                "B) Lysosomes", 
                "C) Ribosomes", 
                "D) Cytoskeleton"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In muscle cells, which specialized organelle functions in storing and releasing calcium ions?", 
            options: [
                "A) Rough Endoplasmic Reticulum", 
                "B) Smooth Endoplasmic Reticulum", 
                "C) Mitochondrion", 
                "D) Golgi apparatus"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In steroid hormone-producing cells, what is the primary function of the smooth endoplasmic reticulum?", 
            options: [
                "A) Protein synthesis", 
                "B) Lipid and steroid synthesis", 
                "C) Carbohydrate metabolism", 
                "D) DNA replication"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which organelle is involved in the storage and modification of ions and small molecules?", 
            options: [
                "A) Vacuole", 
                "B) Mitochondrion", 
                "C) Nucleolus", 
                "D) Peroxisome"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which part of the cell is the site for most metabolic reactions?", 
            options: [
                "A) Cytosol", 
                "B) Nucleus", 
                "C) Golgi apparatus", 
                "D) Lysosome"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which organelle plays a key role in detoxifying harmful substances within the cell?", 
            options: [
                "A) Peroxisome", 
                "B) Ribosome", 
                "C) Lysosome", 
                "D) Endoplasmic Reticulum"
            ], 
            answer: "A" 
        },

        { 
            type: "mcq", 
            question: "What is the fundamental unit of biological classification?", 
            options: [
                "A) Kingdom", 
                "B) Genus", 
                "C) Species", 
                "D) Family"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "The scientific discipline of naming, describing, and classifying organisms is called:", 
            options: [
                "A) Taxonomy", 
                "B) Ecology", 
                "C) Physiology", 
                "D) Anatomy"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is NOT part of the classical five-kingdom system?", 
            options: [
                "A) Monera", 
                "B) Protista", 
                "C) Archaea", 
                "D) Fungi"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "What is the system of naming organisms using two terms, the genus and species, called?", 
            options: [
                "A) Binomial nomenclature", 
                "B) Trinomial nomenclature", 
                "C) Polynomial nomenclature", 
                "D) Monomial nomenclature"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Who is regarded as the father of modern taxonomy?", 
            options: [
                "A) Charles Darwin", 
                "B) Gregor Mendel", 
                "C) Carolus Linnaeus", 
                "D) Alfred Russel Wallace"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which taxonomic rank directly follows Family in the hierarchical classification system?", 
            options: [
                "A) Order", 
                "B) Genus", 
                "C) Class", 
                "D) Phylum"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which group of organisms is classified under the kingdom Monera?", 
            options: [
                "A) Bacteria", 
                "B) Fungi", 
                "C) Protists", 
                "D) Algae"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "The evolutionary history and relationships among organisms form the basis of which classification approach?", 
            options: [
                "A) Morphological classification", 
                "B) Molecular classification", 
                "C) Phylogenetic classification", 
                "D) Ecological classification"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "A taxonomic group that includes a common ancestor and all its descendants is known as a:", 
            options: [
                "A) Polyphyletic group", 
                "B) Paraphyletic group", 
                "C) Monophyletic group", 
                "D) Heterophyletic group"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which characteristic is primarily used to distinguish between organisms in the kingdoms Plantae and Animalia?", 
            options: [
                "A) Mode of energy acquisition", 
                "B) Presence of a cell wall", 
                "C) Reproductive mechanisms", 
                "D) Locomotion"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In the classical five-kingdom classification, which kingdom comprises mostly unicellular organisms that lack a nucleus?", 
            options: [
                "A) Protista", 
                "B) Monera", 
                "C) Fungi", 
                "D) Plantae"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What term is used to describe grouping organisms based on evolutionary relationships using shared characteristics?", 
            options: [
                "A) Cladistics", 
                "B) Anatomy", 
                "C) Physiology", 
                "D) Morphology"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which kingdom is characterized by organisms that primarily obtain nutrients through absorption?", 
            options: [
                "A) Animalia", 
                "B) Plantae", 
                "C) Fungi", 
                "D) Protista"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "The hierarchical system that classifies living things was primarily developed by:", 
            options: [
                "A) Charles Darwin", 
                "B) Carolus Linnaeus", 
                "C) Louis Pasteur", 
                "D) Ernst Haeckel"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which taxonomic rank is the most inclusive?", 
            options: [
                "A) Genus", 
                "B) Family", 
                "C) Order", 
                "D) Kingdom"
            ], 
            answer: "D" 
        },

        { 
            type: "mcq", 
            question: "Identify the organelle responsible for intracellular digestion and recycling of cellular waste.", 
            options: [
                "A) Lysosome", 
                "B) Peroxisome", 
                "C) Endoplasmic Reticulum", 
                "D) Golgi apparatus"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Describe the main role of the Golgi apparatus in eukaryotic cells.", 
            options: [
                "A) Lipid synthesis", 
                "B) Protein packaging and post-translational modification", 
                "C) DNA replication", 
                "D) ATP production"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "State the primary function of ribosomes within a cell.", 
            options: [
                "A) Protein synthesis", 
                "B) Lipid metabolism", 
                "C) Carbohydrate storage", 
                "D) Nucleic acid replication"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Determine the function of the smooth endoplasmic reticulum in steroid-producing cells.", 
            options: [
                "A) Protein folding", 
                "B) Lipid and steroid hormone synthesis", 
                "C) Glycolysis", 
                "D) Ribosome assembly"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Explain the contribution of the nucleus to overall cellular activity.", 
            options: [
                "A) Housing genetic material and regulating gene expression", 
                "B) Generating energy", 
                "C) Protein secretion", 
                "D) Detoxifying chemicals"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Assess the role of peroxisomes in cellular metabolism.", 
            options: [
                "A) Breakdown of fatty acids and detoxification of reactive oxygen species", 
                "B) Synthesis of proteins", 
                "C) Production of ribosomes", 
                "D) Modification of carbohydrates"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Recognize the function of chloroplasts in plant cells.", 
            options: [
                "A) Protein synthesis", 
                "B) Photosynthesis and energy conversion", 
                "C) Lipid degradation", 
                "D) Cellular respiration"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Evaluate the storage function of vacuoles in plant cells.", 
            options: [
                "A) Structural support", 
                "B) Storage of water, nutrients, and waste products while maintaining turgor pressure", 
                "C) Synthesis of proteins", 
                "D) Breakdown of cellular waste"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Determine the role of the nuclear envelope in maintaining cellular integrity.", 
            options: [
                "A) Serving as a site for ATP synthesis", 
                "B) Regulating transport between the nucleus and cytoplasm", 
                "C) Catalyzing metabolic reactions", 
                "D) Synthesizing RNA"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What does the lysosome do in a cell?", 
            options: [
                "A) Protein synthesis", 
                "B) Digest cellular waste", 
                "C) Produce energy", 
                "D) Store genetic information"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the role of the Golgi apparatus?", 
            options: [
                "A) Package and modify proteins", 
                "B) Generate ATP", 
                "C) Synthesize lipids", 
                "D) Store genetic material"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What happens in the rough endoplasmic reticulum?", 
            options: [
                "A) Lipid synthesis", 
                "B) Protein synthesis", 
                "C) ATP production", 
                "D) Carbohydrate storage"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the main function of the smooth endoplasmic reticulum?", 
            options: [
                "A) Carbohydrate metabolism", 
                "B) Steroid hormone synthesis", 
                "C) DNA replication", 
                "D) Protein folding"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "How do mitochondria contribute to the cell?", 
            options: [
                "A) Produce proteins", 
                "B) Generate energy", 
                "C) Remove waste", 
                "D) Store calcium"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the function of chloroplasts in plant cells?", 
            options: [
                "A) Protein synthesis", 
                "B) Photosynthesis", 
                "C) Cellular respiration", 
                "D) Lipid production"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What role does the nucleus play in a cell?", 
            options: [
                "A) Control cell activities and store DNA", 
                "B) Produce energy", 
                "C) Synthesize proteins", 
                "D) Digest waste"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What does the peroxisome do in the cell?", 
            options: [
                "A) Break down fatty acids and detoxify chemicals", 
                "B) Synthesize proteins", 
                "C) Modify lipids", 
                "D) Package proteins"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "What is the function of the vacuole in plant cells?", 
            options: [
                "A) Protein synthesis", 
                "B) Store water and nutrients", 
                "C) Replicate DNA", 
                "D) Produce energy"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the main role of the nuclear envelope?", 
            options: [
                "A) DNA replication", 
                "B) Regulate transport between the nucleus and cytoplasm", 
                "C) Produce ATP", 
                "D) Synthesize proteins"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "Which process is essential for generating genetic variation in sexual reproduction?", 
            options: [
                "A) Mitosis", 
                "B) Meiosis", 
                "C) Binary fission", 
                "D) Budding"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which form of reproduction results in offspring that are genetically identical to the parent?", 
            options: [
                "A) Sexual reproduction", 
                "B) Asexual reproduction", 
                "C) Cross-fertilization", 
                "D) Hermaphroditic reproduction"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is considered the basic unit of heredity?", 
            options: [
                "A) Chromosome", 
                "B) Gene", 
                "C) Cell", 
                "D) Protein"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "According to Mendel's Law of Segregation, during gamete formation, allele pairs:", 
            options: [
                "A) Combine randomly", 
                "B) Segregate so that each gamete carries only one allele for each gene", 
                "C) Remain together", 
                "D) Mutate"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which evidence supports the theory of evolution by natural selection?", 
            options: [
                "A) Fossil records", 
                "B) Comparative anatomy", 
                "C) Molecular biology", 
                "D) All of the above"
            ], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "Which statement best describes mutualism in interrelationships among organisms?", 
            options: [
                "A) One organism benefits at the expense of another", 
                "B) Both organisms benefit from the interaction", 
                "C) One organism benefits while the other is unaffected", 
                "D) Both organisms are harmed"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which term describes the process where advantageous traits become more common in a population over time?", 
            options: [
                "A) Genetic drift", 
                "B) Natural selection", 
                "C) Mutation", 
                "D) Gene flow"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the primary source of genetic diversity in sexually reproducing organisms?", 
            options: [
                "A) Crossing over during meiosis", 
                "B) Mitosis", 
                "C) Cloning", 
                "D) Budding"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which interaction describes a relationship where one organism benefits while the other is harmed?", 
            options: [
                "A) Commensalism", 
                "B) Mutualism", 
                "C) Parasitism", 
                "D) Competition"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which mechanism is responsible for the transfer of genetic material between separate populations, thereby increasing genetic variation?", 
            options: [
                "A) Genetic mutation", 
                "B) Genetic drift", 
                "C) Gene flow", 
                "D) Natural selection"
            ], 
            answer: "C" 
        },

        { 
            type: "mcq", 
            question: "Which term best describes the variety of species present in an ecosystem?", 
            options: [
                "A) Genetic diversity", 
                "B) Species diversity", 
                "C) Ecosystem diversity", 
                "D) Functional diversity"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is a clade in evolutionary biology?", 
            options: [
                "A) A group of organisms with similar physical traits", 
                "B) A group of organisms that share a common ancestor and all its descendants", 
                "C) A group of species living in the same habitat", 
                "D) A group of organisms with identical DNA sequences"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which type of reproduction involves the fusion of male and female gametes?", 
            options: [
                "A) Asexual reproduction", 
                "B) Binary fission", 
                "C) Sexual reproduction", 
                "D) Budding"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which mechanism introduces new genetic variations into a population?", 
            options: [
                "A) Natural selection", 
                "B) Mutation", 
                "C) Genetic drift", 
                "D) Gene flow"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In the context of evolutionary fitness, what does 'fitness' primarily refer to?", 
            options: [
                "A) Physical strength", 
                "B) Adaptability", 
                "C) Reproductive success", 
                "D) Survival ability"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best exemplifies a commensal relationship?", 
            options: [
                "A) Cleaner fish removing parasites from a larger fish", 
                "B) Birds nesting in trees without significantly affecting the tree", 
                "C) A parasite harming its host", 
                "D) Bees pollinating flowers"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What does 'genetic diversity' refer to?", 
            options: [
                "A) The total number of species in an ecosystem", 
                "B) The variety of genes within a species", 
                "C) The differences in physical traits among species", 
                "D) The number of different ecosystems in a region"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which process can result in the formation of a new species over time?", 
            options: [
                "A) Speciation", 
                "B) Mutation", 
                "C) Natural selection", 
                "D) Genetic drift"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "The modern synthesis in evolutionary biology is an integration of which two major disciplines?", 
            options: [
                "A) Genetics and ecology", 
                "B) Paleontology and biochemistry", 
                "C) Genetics and natural selection", 
                "D) Physiology and molecular biology"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which reproductive strategy results in offspring that are genetically identical to the parent?", 
            options: [
                "A) Sexual reproduction", 
                "B) Asexual reproduction", 
                "C) Fertilization", 
                "D) Cross-breeding"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "Which of the following is an abiotic factor in an ecosystem?", 
            options: [
                "A) Predation", 
                "B) Temperature", 
                "C) Competition", 
                "D) Parasitism"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In ecology, the term 'niche' refers to:", 
            options: [
                "A) The physical area an organism inhabits", 
                "B) The role an organism plays in its ecosystem", 
                "C) The size of the population", 
                "D) The type of habitat"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which habitat is characterized by extremely low precipitation and high temperature fluctuations?", 
            options: [
                "A) Tropical rainforest", 
                "B) Desert", 
                "C) Wetland", 
                "D) Grassland"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is an example of a freshwater habitat?", 
            options: [
                "A) Coral reef", 
                "B) Lake", 
                "C) Estuary", 
                "D) Salt marsh"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which nutrient is often a limiting factor in many terrestrial ecosystems?", 
            options: [
                "A) Nitrogen", 
                "B) Phosphorus", 
                "C) Potassium", 
                "D) Calcium"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best describes a biotic factor in an ecosystem?", 
            options: [
                "A) Sunlight", 
                "B) Soil pH", 
                "C) Insects", 
                "D) Temperature"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "What defines an ecological habitat?", 
            options: [
                "A) A group of interacting species", 
                "B) The physical environment where an organism lives", 
                "C) Only the living components", 
                "D) Only the non-living components"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which habitat type is characterized by permanently frozen ground and low biodiversity?", 
            options: [
                "A) Tundra", 
                "B) Desert", 
                "C) Savannah", 
                "D) Temperate forest"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Marine habitats are primarily characterized by:", 
            options: [
                "A) Low salt concentration", 
                "B) Saline water", 
                "C) High oxygen content", 
                "D) Arid conditions"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is NOT considered an element of an ecosystem?", 
            options: [
                "A) Energy flow", 
                "B) Nutrient cycling", 
                "C) Human cultural practices", 
                "D) Biotic interactions"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "How does a habitat differ from an ecosystem?", 
            options: [
                "A) Habitat refers only to the physical environment, while an ecosystem includes both living and non-living components", 
                "B) Habitat includes both biotic and abiotic factors, while an ecosystem is strictly biotic", 
                "C) They are synonymous", 
                "D) Habitat only applies to terrestrial environments"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which habitat is known for its high rainfall and dense vegetation?", 
            options: [
                "A) Desert", 
                "B) Tropical rainforest", 
                "C) Tundra", 
                "D) Grassland"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "One key difference between plants and animals is that plants:", 
            options: [
                "A) Are heterotrophic", 
                "B) Have chloroplasts", 
                "C) Lack cell walls", 
                "D) Are motile"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Unlike animals, plants primarily obtain energy through:", 
            options: [
                "A) Chemosynthesis", 
                "B) Autotrophy", 
                "C) Heterotrophy", 
                "D) Parasitism"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Plant cells are distinct from animal cells by the presence of:", 
            options: [
                "A) Mitochondria", 
                "B) Chloroplasts", 
                "C) Nucleus", 
                "D) Ribosomes"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best explains why most plants are sessile?", 
            options: [
                "A) They lack cell walls", 
                "B) They perform photosynthesis", 
                "C) They have a rigid structure due to cell walls", 
                "D) They are heterotrophic"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Many plants reproduce both sexually and asexually, whereas most animals reproduce:", 
            options: [
                "A) Only asexually", 
                "B) Only sexually", 
                "C) Both ways equally", 
                "D) By binary fission"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Decomposers play a vital role in an ecosystem by:", 
            options: [
                "A) Producing oxygen", 
                "B) Breaking down dead organic matter", 
                "C) Consuming primary producers", 
                "D) Fixing nitrogen"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which habitat would you most likely find in a coastal area?", 
            options: [
                "A) Desert", 
                "B) Mangrove forest", 
                "C) Tundra", 
                "D) Alpine meadow"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Environmental gradients, such as changes in temperature and moisture, primarily influence:", 
            options: [
                "A) The genetic code of organisms", 
                "B) The distribution and abundance of species", 
                "C) The chemical composition of DNA", 
                "D) The internal structure of cells"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Wetlands are characterized by:", 
            options: [
                "A) Excess water and water-saturated soil", 
                "B) Arid conditions", 
                "C) Low nutrient levels", 
                "D) High salinity"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following is a characteristic habitat for desert-adapted organisms?", 
            options: [
                "A) High precipitation", 
                "B) Low water availability", 
                "C) Dense forest canopy", 
                "D) Cold temperatures"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "One major difference between animal and plant cells is that animal cells:", 
            options: [
                "A) Contain chloroplasts", 
                "B) Have cell walls", 
                "C) Lack a rigid cell wall", 
                "D) Perform photosynthesis"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Which process is most directly responsible for nutrient cycling in an ecosystem?", 
            options: [
                "A) Photosynthesis", 
                "B) Decomposition", 
                "C) Cellular respiration", 
                "D) Transpiration"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Succession in an ecosystem refers to:", 
            options: [
                "A) A random change in species composition", 
                "B) A predictable sequence of community changes over time", 
                "C) The immediate replacement of all species", 
                "D) A decrease in biodiversity over time"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "Which of the following is a common asexual reproduction method in unicellular algae?", 
            options: [
                "A) Conjugation", 
                "B) Binary fission", 
                "C) Syngamy", 
                "D) Pollination"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Bryophytes, such as mosses, are characterized by a dominant:", 
            options: [
                "A) Sporophyte generation", 
                "B) Gametophyte generation", 
                "C) Both generations equally", 
                "D) No alternation of generations"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In pteridophytes (ferns and their relatives), which generation is dominant?", 
            options: [
                "A) Gametophyte", 
                "B) Sporophyte", 
                "C) Both equally", 
                "D) Neither"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In flowering plants, the structure that develops into a fruit after fertilization is the:", 
            options: [
                "A) Stamen", 
                "B) Ovary", 
                "C) Petal", 
                "D) Sepal"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Pollination in flowering plants involves the transfer of pollen from the:", 
            options: [
                "A) Stigma", 
                "B) Ovary", 
                "C) Anther", 
                "D) Style"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Fungi reproduce primarily by forming which reproductive structures?", 
            options: [
                "A) Seeds", 
                "B) Spores", 
                "C) Buds", 
                "D) Pollen"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Bacteria mainly reproduce by which process?", 
            options: [
                "A) Binary fission", 
                "B) Conjugation", 
                "C) Budding", 
                "D) Fragmentation"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Viruses can only reproduce by:", 
            options: [
                "A) Binary fission", 
                "B) Budding", 
                "C) Utilizing host cellular machinery", 
                "D) Spore formation"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "The alternation of generations in flowering plants involves which two distinct phases?", 
            options: [
                "A) Sporophyte and gametophyte", 
                "B) Vegetative and reproductive", 
                "C) Diploid and triploid", 
                "D) Seed and seedling"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "In the life cycle of flowering plants, the male gametophyte is represented by the:", 
            options: [
                "A) Embryo sac", 
                "B) Pollen grain", 
                "C) Ovule", 
                "D) Endosperm"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Which of the following groups does not exhibit an alternation of generations?", 
            options: [
                "A) Bryophytes", 
                "B) Pteridophytes", 
                "C) Flowering plants", 
                "D) Bacteria"
            ], 
            answer: "D" 
        },
        { 
            type: "mcq", 
            question: "The remarkable diversity in flower morphology among angiosperms is mainly due to variations in:", 
            options: [
                "A) Leaf shape", 
                "B) Root structure", 
                "C) Flower structure", 
                "D) Stem height"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "The complete sequence of events from seed germination to the production of new seeds in flowering plants is referred to as the:", 
            options: [
                "A) Metamorphosis", 
                "B) Reproductive cycle", 
                "C) Life cycle", 
                "D) Generational shift"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "Non-vascular plants like bryophytes require water primarily for which purpose in their life cycle?", 
            options: [
                "A) Nutrient uptake", 
                "B) Structural support", 
                "C) Sperm motility for fertilization", 
                "D) Seed dispersal"
            ], 
            answer: "C" 
        },
        { 
            type: "mcq", 
            question: "In many algae, sexual reproduction involves the fusion of gametes through a process known as:", 
            options: [
                "A) Binary fission", 
                "B) Syngamy", 
                "C) Fragmentation", 
                "D) Conjugation"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Pteridophytes, such as ferns, have a life cycle characterized by a dominant:", 
            options: [
                "A) Gametophyte phase", 
                "B) Sporophyte phase", 
                "C) A solely asexual cycle", 
                "D) No alternation of generations"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "The development of different cultivars or varieties in flowering plants is most commonly achieved by:", 
            options: [
                "A) Natural mutation alone", 
                "B) Artificial selection and hybridization", 
                "C) Clonal reproduction only", 
                "D) Environmental stress"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "What is the primary function of the endosperm in a flowering plant seed?", 
            options: [
                "A) To protect the embryo", 
                "B) To provide nutrition to the developing embryo", 
                "C) To facilitate pollination", 
                "D) To store genetic information"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In the reproductive process of flowering plants, the role of the stigma is to:", 
            options: [
                "A) Produce pollen", 
                "B) Capture and support incoming pollen", 
                "C) Develop into a fruit", 
                "D) Produce the ovule"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Double fertilization, a unique feature of angiosperms, involves the fusion of one sperm cell with the egg cell and the other with the:", 
            options: [
                "A) Central cell (polar nuclei)", 
                "B) Endosperm", 
                "C) Ovary wall", 
                "D) Stigma"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Which of the following best explains the diversity in form among flowering plants?", 
            options: [
                "A) Variations in their photosynthetic pigments", 
                "B) Differences in their floral structures and pollination strategies", 
                "C) Uniform genetic makeup", 
                "D) Similar root systems"
            ], 
            answer: "B" 
        },

        { 
            type: "mcq", 
            question: "In pteridophytes, the sporophyte generation is primarily responsible for:", 
            options: [
                "A) Producing gametes directly", 
                "B) Generating spores through meiosis", 
                "C) Initiating vegetative propagation", 
                "D) Forming the protonema"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In sexually reproducing algae, genetic variation is mainly introduced through:", 
            options: [
                "A) Binary fission", 
                "B) Conjugation", 
                "C) Budding", 
                "D) Fragmentation"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Fungi exhibit variation in their life cycles primarily by reproducing through:", 
            options: [
                "A) Asexual and sexual spore formation", 
                "B) Binary fission", 
                "C) Conjugation", 
                "D) Budding of hyphae"
            ], 
            answer: "A" 
        },
        { 
            type: "mcq", 
            question: "Bacteria reproduce mainly through binary fission, which results in:", 
            options: [
                "A) Increased genetic diversity", 
                "B) Clonal populations with minimal variation", 
                "C) Sexual recombination", 
                "D) Formation of complex spores"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Vegetative propagation in flowering plants leads to offspring that are:", 
            options: [
                "A) Genetically diverse", 
                "B) Clonal copies of the parent", 
                "C) Produced through double fertilization", 
                "D) Resulting from meiotic recombination"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Double fertilization in angiosperms results in the formation of:", 
            options: [
                "A) Two identical embryos", 
                "B) A diploid embryo and a triploid endosperm", 
                "C) A haploid embryo and a diploid endosperm", 
                "D) Only the endosperm"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "In bryophytes, the protonema stage is crucial because it:", 
            options: [
                "A) Directly forms spores", 
                "B) Develops into the mature gametophyte", 
                "C) Serves as the dominant life stage", 
                "D) Initiates the formation of vascular tissue"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Variation in floral traits among angiosperms is most often driven by:", 
            options: [
                "A) Soil nutrient levels", 
                "B) Pollinator preferences", 
                "C) Root architecture", 
                "D) Leaf size and shape"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "Viruses differ from cellular organisms in that they:", 
            options: [
                "A) Reproduce by binary fission", 
                "B) Rely entirely on host cellular machinery for replication", 
                "C) Undergo mitosis", 
                "D) Reproduce solely via budding"
            ], 
            answer: "B" 
        },
        { 
            type: "mcq", 
            question: "A common method of asexual reproduction in many algae is:", 
            options: [
                "A) Spore formation", 
                "B) Conjugation", 
                "C) Vegetative fragmentation", 
                "D) Double fertilization"
            ], 
            answer: "C" 
        },
    ];
    
    
        
        // Add these questions to your existing questions array
      //  questions.push(...additionalQuestions);];

    function selectRandomQuestions() {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        selectedQuestions = shuffled.slice(0, totalQuestions);
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form refresh
        
        const matricNo = document.getElementById("matric-no").value.trim();
        const password = document.getElementById("password").value.trim();
    
        if (matricNo === "" || password === "") {
            alert("Please enter both Matric No and Password.");
            return;
        }
    
        userMatric.textContent = matricNo;
        userMatricTest.textContent = matricNo;
        
        
        // Hide home page and show instructions page
        homePage.classList.add("hidden");
        instructionsPage.classList.remove("hidden");
    });
    

    startTestBtn.addEventListener("click", () => {
        instructionsPage.classList.add("hidden");
        testPage.classList.remove("hidden");
        selectRandomQuestions();
        document.body.prepend(timerDisplay);
        startTimer();
        generateQuestionIcons();
        loadQuestion();
    });

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }

    function generateQuestionIcons() {
        questionIconsDiv.innerHTML = "";
        for (let i = 1; i <= totalQuestions; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("question-btn");
            btn.addEventListener("click", () => {
                currentQuestion = i;
                loadQuestion();
            });
            questionIconsDiv.appendChild(btn);
        }
    }

    function loadQuestion() {
        const q = selectedQuestions[currentQuestion - 1];
        questionText.textContent = `Question ${currentQuestion}: ${q.question}`;
        optionsDiv.innerHTML = "";

        if (q.type === "mcq") {
            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "answer";
                input.value = option;

                label.appendChild(input);
                label.append(option);
                optionsDiv.appendChild(label);
                optionsDiv.appendChild(document.createElement("br"));
            });
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "fill-answer";
            optionsDiv.appendChild(input);
        }
    }

    saveButton.addEventListener("click", () => {
        const selectedOption = document.querySelector("input[name='answer']:checked");
        const fillAnswer = document.getElementById("fill-answer");

        if (selectedOption) {
            answers[currentQuestion] = selectedOption.value;
        } else if (fillAnswer) {
            answers[currentQuestion] = fillAnswer.value;
        }

        updateQuestionIconColor();
    });

    function updateQuestionIconColor() {
        document.querySelectorAll(".question-btn").forEach((btn, index) => {
            if (answers[index + 1]) {
                btn.style.backgroundColor = "blue";
                btn.style.color = "white";
            }
        });
    }


    submitButton.addEventListener("click", submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        testPage.classList.add("hidden");

        let correctAnswers = 0;
        reviewPage.innerHTML = "<h2>Test Submitted! Review Your Answers</h2>";

        selectedQuestions.forEach((q, index) => {
            const userAnswer = answers[index + 1] || "Not Answered";
            const isCorrect = q.type === "mcq" 
                ? (userAnswer.charAt(0).toUpperCase() === q.answer.toUpperCase())
                : (userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase());

            if (isCorrect) correctAnswers++;

            reviewPage.innerHTML += `
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswer}</p>
                <p><strong>Correct Answer:</strong> ${q.options[q.answer.charCodeAt(0) - 65]}</p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">
                    ${isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </p>
            `;
        });

        reviewPage.innerHTML = `<h3>You scored ${correctAnswers} out of ${totalQuestions}.</h3>` + reviewPage.innerHTML;
        document.body.appendChild(reviewPage);
        alert("Test submitted! Check your results.");
    }

    document.getElementById("next").addEventListener("click", () => {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            loadQuestion();
        }
    });

    document.getElementById("prev").addEventListener("click", () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            loadQuestion();
        }
    });
});
