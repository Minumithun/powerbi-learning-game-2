// Complete Power BI Learning Game JavaScript
class PowerBIGame {
    constructor() {
        this.currentModule = 1;
        this.currentStep = 0;
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.completedModules = JSON.parse(localStorage.getItem('completedModules')) || [];
        this.userProgress = JSON.parse(localStorage.getItem('userProgress')) || {
            modules: {},
            totalProgress: 0
        };
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.updateProgress();
        this.setupEventListeners();
        console.log('Power BI Learning Game initialized!');
    }

    // Module data with complete lessons
    getModuleData() {
        return {
            1: {
                title: "Data Connection",
                description: "Learn how to connect to various data sources",
                icon: "🔗",
                steps: [
                    {
                        title: "Opening Power BI Desktop",
                        instruction: `
                            <h4>🚀 Step 1: Launch Power BI Desktop</h4>
                            <p><strong>What you'll learn:</strong> How to open Power BI Desktop and navigate the home screen</p>
                            <ol>
                                <li>Double-click the Power BI Desktop icon on your desktop</li>
                                <li>Wait for the application to load completely</li>
                                <li>You'll see the welcome screen with various options</li>
                                <li>Look for the "Get data" button in the Home ribbon</li>
                            </ol>
                            <div style="background: #e8f4fd; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                <strong>💡 Pro Tip:</strong> Power BI Desktop is free! You can download it from Microsoft's website if you don't have it installed.
                            </div>
                        `,
                        screenshot: this.createPlaceholderSVG(800, 500, "Power BI Desktop Home Screen", "Click 'Get Data' to start"),
                        hotspots: [
                            { x: 350, y: 250, tooltip: "Click 'Get Data' here!" }
                        ]
                    },
                    {
                        title: "Selecting Data Source",
                        instruction: `
                            <h4>📊 Step 2: Choose Your Data Source</h4>
                            <p><strong>What you'll learn:</strong> Navigate the Get Data dialog and select Excel as data source</p>
                            <ol>
                                <li>The "Get Data" dialog window opens</li>
                                <li>Browse through different data source categories on the left</li>
                                <li>Select "File" category, then choose "Excel"</li>
                                <li>Click "Connect" to proceed to file selection</li>
                            </ol>
                            <div style="background: #fff3cd; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                <strong>⚠️ Note:</strong> Power BI supports 100+ data sources including databases, web services, and cloud platforms!
                            </div>
                        `,
                        screenshot: this.createPlaceholderSVG(700, 400, "Get Data Dialog", "Select Excel from File category"),
                        hotspots: [
                            { x: 200, y: 200, tooltip: "Select Excel here" }
                        ]
                    },
                    {
                        title: "Browsing for File",
                        instruction: `
                            <h4>📁 Step 3: Select Your Excel File</h4>
                            <p><strong>What you'll learn:</strong> Browse and select an Excel file with proper data formatting</p>
                            <ol>
                                <li>File browser dialog opens</li>
                                <li>Navigate to your Excel file location</li>
                                <li>Select a file with data in table format</li>
                                <li>Ensure first row contains column headers</li>
                                <li>Click "Open" to proceed</li>
                            </ol>
                            <div style="background: #d4edda; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                <strong>✅ Best Practice:</strong> Your Excel data should have headers in row 1 and no empty rows between data.
                            </div>
                        `,
                        screenshot: this.createPlaceholderSVG(600, 400, "File Browser", "Select your Excel file"),
                        hotspots: [
                            { x: 500, y: 350, tooltip: "Click Open after selecting file" }
                        ]
                    },
                    {
                        title: "Preview and Load Data",
                        instruction: `
                            <h4>👀 Step 4: Preview Your Data</h4>
                            <p><strong>What you'll learn:</strong> Review data preview and load it into Power BI</p>
                            <ol>
                                <li>Navigator window shows available tables/sheets</li>
                                <li>Select the table you want to import</li>
                                <li>Preview appears on the right side</li>
                                <li>Check data looks correct</li>
                                <li>Click "Load" to import data</li>
                            </ol>
                            <div style="background: #cce5ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                <strong>🔧 Alternative:</strong> Click "Transform Data" if you need to clean your data first!
                            </div>
                        `,
                        screenshot: this.createPlaceholderSVG(800, 500, "Navigator Preview", "Click Load to import data"),
                        hotspots: [
                            { x: 700, y: 450, tooltip: "Click Load here" }
                        ]
                    },
                    {
                        title: "Data Successfully Loaded",
                        instruction: `
                            <h4>🎉 Step 5: Data is Ready!</h4>
                            <p><strong>Congratulations!</strong> You've successfully connected to your data source</p>
                            <ol>
                                <li>Data appears in the Fields panel on the right</li>
                                <li>You can see all your columns listed</li>
                                <li>The report canvas is ready for creating visuals</li>
                                <li>You're now ready to build your first chart!</li>
                            </ol>
                            <div style="background: #d1ecf1; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                                <strong>🚀 Next Steps:</strong> In Module 2, we'll learn how to clean and prepare this data for analysis!
                            </div>
                        `,
                        screenshot: this.createPlaceholderSVG(800, 500, "Power BI with Data Loaded", "Fields panel shows your data"),
                        hotspots: []
                    }
                ],
                quiz: [
                    {
                        question: "What is the first step to connect to data in Power BI Desktop?",
                        options: [
                            "Click on 'New Report'",
                            "Click on 'Get Data'",
                            "Click on 'File' menu",
                            "Click on 'Home' tab"
                        ],
                        correct: 1,
                        explanation: "The 'Get Data' button is the primary way to start connecting to various data sources in Power BI Desktop."
                    },
                    {
                        question: "Which file format did we use in this module for connecting to data?",
                        options: [
                            "CSV file",
                            "SQL Database",
                            "Excel file",
                            "Text file"
                        ],
                        correct: 2,
                        explanation: "We selected Excel as our data source, which is one of the most common formats for business data."
                    },
                    {
                        question: "Where do you see your imported data fields in Power BI Desktop?",
                        options: [
                            "In the Visualizations panel",
                            "In the Fields panel on the right",
                            "In the Filters panel",
                            "In the Home ribbon"
                        ],
                        correct: 1,
                        explanation: "The Fields panel on the right side shows all the columns and tables from your imported data."
                    }
                ]
            }
            // Additional modules would go here
        };
    }

    // Create placeholder SVG images
    createPlaceholderSVG(width, height, title, subtitle = "") {
        return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
            <rect width='${width}' height='${height}' fill='%23f8f9fa'/>
            <rect x='20' y='20' width='${width-40}' height='${height-40}' fill='white' stroke='%23dee2e6' stroke-width='2' rx='8'/>
            <text x='${width/2}' y='${height/2-20}' text-anchor='middle' font-family='Segoe UI' font-size='24' font-weight='600' fill='%236c5ce7'>${encodeURIComponent(title)}</text>
            <text x='${width/2}' y='${height/2+20}' text-anchor='middle' font-family='Segoe UI' font-size='16' fill='%23666'>${encodeURIComponent(subtitle)}</text>
            <circle cx='${width/2}' cy='${height/2+60}' r='8' fill='%23ff6b6b' opacity='0.8'/>
        </svg>`;
    }

    // Screen management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Start a specific module
    startModule(moduleNumber) {
        if (moduleNumber > 1 && !this.completedModules.includes(moduleNumber - 1)) {
            alert(`Please complete Module ${moduleNumber - 1} first!`);
            return;
        }

        this.currentModule = moduleNumber;
        this.currentStep = 0;
        this.loadModuleContent();
        this.showScreen('lessonScreen');
    }

    // Load module content
    loadModuleContent() {
        const moduleData = this.getModuleData()[this.currentModule];
        if (!moduleData) return;

        // Update module title
        document.getElementById('moduleTitle').textContent = `Module ${this.currentModule}: ${moduleData.title}`;

        // Populate steps sidebar
        const stepsContainer = document.getElementById('lessonSteps');
        stepsContainer.innerHTML = '';
        
        moduleData.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = `step-item ${index === this.currentStep ? 'current' : ''} ${index < this.currentStep ? 'completed' : ''}`;
            stepElement.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 0.3rem;">Step ${index + 1}</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">${step.title}</div>
            `;
            stepElement.onclick = () => this.goToStep(index);
            stepsContainer.appendChild(stepElement);
        });

        this.loadCurrentStep();
    }

    // Load current step content
    loadCurrentStep() {
        const moduleData = this.getModuleData()[this.currentModule];
        const step = moduleData.steps[this.currentStep];
        
        // Update step title
        document.getElementById('stepTitle').textContent = step.title;
        
        // Update instruction
        document.getElementById('instructionText').innerHTML = step.instruction;
        
        // Update screenshot
        document.getElementById('stepScreenshot').src = step.screenshot;
        
        // Update progress
        document.getElementById('stepProgress').textContent = `${this.currentStep + 1}/${moduleData.steps.length}`;
        
        // Update navigation buttons
        document.getElementById('prevBtn').disabled = this.currentStep === 0;
        document.getElementById('nextBtn').textContent = 
            this.currentStep === moduleData.steps.length - 1 ? 'Take Quiz →' : 'Next →';
        
        // Add hotspots
        this.addHotspots(step.hotspots || []);
        
        // Update step items in sidebar
        document.querySelectorAll('.step-item').forEach((item, index) => {
            item.className = `step-item ${index === this.currentStep ? 'current' : ''} ${index < this.currentStep ? 'completed' : ''}`;
        });
    }

    // Add interactive hotspots to screenshot
    addHotspots(hotspots) {
        const overlay = document.getElementById('screenshotOverlay');
        overlay.innerHTML = '';
        
        hotspots.forEach((hotspot, index) => {
            const hotspotElement = document.createElement('div');
            hotspotElement.className = 'hotspot';
            hotspotElement.style.left = hotspot.x + 'px';
            hotspotElement.style.top = hotspot.y + 'px';
            hotspotElement.textContent = index + 1;
            hotspotElement.title = hotspot.tooltip || '';
            hotspotElement.onclick = () => this.handleHotspotClick(hotspot);
            overlay.appendChild(hotspotElement);
        });
    }

    // Handle hotspot clicks
    handleHotspotClick(hotspot) {
        alert(`Great! You clicked on: ${hotspot.tooltip}`);
    }

    // Navigation methods
    nextStep() {
        const moduleData = this.getModuleData()[this.currentModule];
        
        if (this.currentStep < moduleData.steps.length - 1) {
            this.currentStep++;
            this.loadCurrentStep();
        } else {
            // Go to quiz
            this.startQuiz();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.loadCurrentStep();
        }
    }

    goToStep(stepIndex) {
        this.currentStep = stepIndex;
        this.loadCurrentStep();
    }

    // Quiz functionality
    startQuiz() {
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.showScreen('quizScreen');
        this.loadQuizQuestion();
    }

    loadQuizQuestion() {
        const moduleData = this.getModuleData()[this.currentModule];
        const question = moduleData.quiz[this.currentQuizQuestion];
        
        document.getElementById('currentQuestion').textContent = this.currentQuizQuestion + 1;
        document.getElementById('totalQuestions').textContent = moduleData.quiz.length;
        document.getElementById('quizQuestion').textContent = question.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.onclick = () => this.selectQuizOption(index, optionElement);
            optionsContainer.appendChild(optionElement);
        });
        
        document.getElementById('quizResult').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'block';
        this.selectedAnswer = null;
    }

    selectQuizOption(index, element) {
        document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedAnswer = index;
    }

    submitQuiz() {
        if (this.selectedAnswer === null) {
            alert('Please select an answer first!');
            return;
        }

        const moduleData = this.getModuleData()[this.currentModule];
        const question = moduleData.quiz[this.currentQuizQuestion];
        const isCorrect = this.selectedAnswer === question.correct;
        
        if (isCorrect) {
            this.quizScore++;
        }

        // Show result
        const resultDiv = document.getElementById('quizResult');
        resultDiv.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;
        resultDiv.innerHTML = `
            <h4>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>
            <p>${question.explanation}</p>
        `;
        resultDiv.style.display = 'block';
        
        // Update option styling
        document.querySelectorAll('.quiz-option').forEach((opt, index) => {
            if (index === question.correct) {
                opt.classList.add('correct');
            } else if (index === this.selectedAnswer && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Update submit button
        document.getElementById('submitBtn').textContent = 
            this.currentQuizQuestion < moduleData.quiz.length - 1 ? 'Next Question' : 'Complete Module';
        document.getElementById('submitBtn').onclick = () => this.nextQuizQuestion();
    }

    nextQuizQuestion() {
        const moduleData = this.getModuleData()[this.currentModule];
        
        if (this.currentQuizQuestion < moduleData.quiz.length - 1) {
            this.currentQuizQuestion++;
            this.loadQuizQuestion();
            document.getElementById('submitBtn').onclick = () => this.submitQuiz();
        } else {
            this.completeModule();
        }
    }

    completeModule() {
        // Mark module as completed
        if (!this.completedModules.includes(this.currentModule)) {
            this.completedModules.push(this.currentModule);
        }
        
        // Calculate completion time
        const completionTime = Math.round((Date.now() - this.startTime) / 1000 / 60 * 100) / 100;
        const scorePercentage = Math.round(this.quizScore / this.getModuleData()[this.currentModule].quiz.length * 100);
        
        // Update achievement screen
        document.getElementById('achievementText').textContent = 
            `You've completed Module ${this.currentModule}: ${this.getModuleData()[this.currentModule].title}!`;
        document.getElementById('completionTime').textContent = `${completionTime} min`;
        document.getElementById('quizScore').textContent = `${scorePercentage}%`;
        document.getElementById('earnedBadge').textContent = this.getModuleData()[this.currentModule].icon;
        
        // Save progress
        this.saveProgress();
        this.updateModuleCards();
        
        this.showScreen('achievementScreen');
    }

    continueToNextModule() {
        if (this.currentModule < 6) {
            this.startTime = Date.now();
            this.showScreen('moduleScreen');
        } else {
            alert('Congratulations! You\'ve completed all modules!');
            this.showScreen('moduleScreen');
        }
    }

    updateModuleCards() {
        for (let i = 1; i <= 6; i++) {
            const card = document.querySelector(`[data-module="${i}"]`);
            const badge = document.getElementById(`badge${i}`);
            
            if (this.completedModules.includes(i)) {
                card.classList.remove('locked');
                card.classList.add('completed');
                badge.textContent = '✅ Completed';
                badge.className = 'badge completed';
            } else if (i === 1 || this.completedModules.includes(i - 1)) {
                card.classList.remove('locked');
                card.classList.add('unlocked');
                card.onclick = () => this.startModule(i);
                badge.textContent = '📚 Available';
                badge.className = 'badge current';
            }
        }
    }

    updateProgress() {
        const totalModules = 6;
        const progress = (this.completedModules.length / totalModules) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = `${Math.round(progress)}% Complete`;
    }

    saveProgress() {
        localStorage.setItem('completedModules', JSON.stringify(this.completedModules));
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }

    setupEventListeners() {
        // Initialize module cards
        this.updateModuleCards();
    }
}

// Global functions for HTML onclick events
function startGame() {
    window.powerBIGame.showScreen('moduleScreen');
}

function selectModule(moduleNumber) {
    window.powerBIGame.startModule(moduleNumber);
}

function nextStep() {
    window.powerBIGame.nextStep();
}

function previousStep() {
    window.powerBIGame.previousStep();
}

function submitQuiz() {
    window.powerBIGame.submitQuiz();
}

function continueToNextModule() {
    window.powerBIGame.continueToNextModule();
}

function backToModules() {
    window.powerBIGame.showScreen('moduleScreen');
}

function simulateTask() {
    alert('🎮 Great job! You\'ve simulated this step. In a real scenario, you would perform this action in Power BI Desktop.');
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.powerBIGame = new PowerBIGame();
    console.log('🚀 Power BI Learning Adventure is ready!');
});
// Add this to your setupEventListeners function
function setupEventListeners() {
    // ... existing code ...

    // Reset game button
    document.getElementById('reset-game-btn').addEventListener('click', showResetConfirmation);
}

// Show reset confirmation
function showResetConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'reset-modal';
    modal.innerHTML = `
        <div class="reset-modal-content">
            <h3>🔄 Reset Your Progress?</h3>
            <p>Are you sure you want to reset all your progress?</p>
            <p><strong>This will:</strong></p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>Reset all points to 0</li>
                <li>Remove all badges</li>
                <li>Mark all steps as incomplete</li>
                <li>Start fresh from the beginning</li>
            </ul>
            <p><em>This action cannot be undone!</em></p>
            <div class="reset-modal-buttons">
                <button class="confirm-reset">Yes, Reset Everything</button>
                <button class="cancel-reset">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners for modal buttons
    modal.querySelector('.confirm-reset').addEventListener('click', () => {
        resetGame();
        modal.remove();
    });
    
    modal.querySelector('.cancel-reset').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Reset game function
function resetGame() {
    // Reset game state
    gameState = {
        totalPoints: 0,
        badges: {
            connector: false,
            charts: false,
            design: false,
            filters: false,
            hero: false
        },
        moduleProgress: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        },
        completedSteps: new Set()
    };
    
    // Clear localStorage
    localStorage.removeItem('powerbi-game-progress');
    
    // Reset UI
    resetUI();
    
    // Show reset confirmation
    showResetSuccess();
    
    // Go back to overview
    showModule('overview');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-module="overview"]').classList.add('active');
}

// Reset UI elements
function resetUI() {
    // Reset all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('completed');
    });
    
    // Reset all badges
    document.querySelectorAll('.badge').forEach(badge => {
        badge.classList.remove('unlocked');
        badge.classList.add('locked');
    });
    
    // Hide success messages
    document.querySelectorAll('.success-message, .celebration-trigger').forEach(element => {
        element.style.display = 'none';
    });
    
    // Update counters
    updateUI();
}

// Show reset success message
function showResetSuccess() {
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>🎮 Game Reset Successfully!</h3>
            <p>Your Power BI quest starts fresh. Good luck!</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
