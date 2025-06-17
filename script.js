// Theme Management
let themeSelected = false;
let currentWaterLevel = ‘still’;
let selectedRoles = [];

function setTheme(theme) {
document.documentElement.setAttribute(‘data-theme’, theme);
localStorage.setItem(‘theme’, theme);

```
// Update active button
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
});
event.target.classList.add('active');

// Enable continue button after first theme selection
if (!themeSelected) {
    themeSelected = true;
    document.getElementById('comfortCheck').style.display = 'block';
    document.getElementById('continueBtn').disabled = false;
}
```

}

function setFontSize(size) {
document.documentElement.style.fontSize = size + ‘px’;
localStorage.setItem(‘fontSize’, size);
}

function showAccountSetup() {
document.getElementById(‘comfortSetup’).style.display = ‘none’;
document.getElementById(‘accountSetup’).style.display = ‘flex’;
}

function createAccount(event) {
event.preventDefault();

```
// Store account info
const formData = new FormData(event.target);
const accountInfo = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    handle: formData.get('handle')
};

// In a real app, this would save to database
localStorage.setItem('accountInfo', JSON.stringify(accountInfo));

// Move to community explanation
document.getElementById('accountSetup').style.display = 'none';
document.getElementById('communityExplanation').style.display = 'flex';
```

}

function showWaterLevel() {
document.getElementById(‘communityExplanation’).style.display = ‘none’;
document.getElementById(‘waterLevelCheck’).style.display = ‘flex’;
}

function setWaterLevel(level) {
currentWaterLevel = level;

```
// Update selected state
document.querySelectorAll('.water-option').forEach(btn => {
    btn.classList.remove('selected');
});
event.target.closest('.water-option').classList.add('selected');

// Store water level
localStorage.setItem('waterLevel', level);

// Show next screen after a brief delay
setTimeout(() => {
    document.getElementById('waterLevelCheck').style.display = 'none';
    document.getElementById('communitySelection').style.display = 'flex';
}, 500);
```

}

function showRoleSelection() {
document.getElementById(‘communitySelection’).style.display = ‘none’;
document.getElementById(‘roleSelection’).style.display = ‘flex’;
}

function showVettingQuestions() {
// For now, skip to main app - we’ll add vetting questions later
document.getElementById(‘roleSelection’).style.display = ‘none’;
document.getElementById(‘appContainer’).style.display = ‘block’;

```
// Scroll to top
window.scrollTo(0, 0);

// Start Bridge Builder status updates
updateBridgeBuilderStatus();

// Update water state in header
updateHeaderWaterState();
```

}

function showCircle(circleName) {
// Check if circle is locked
if (event.target.classList.contains(‘locked’)) {
alert(‘Request Access 🗝️\n\nThis circle requires vetting to keep everyone safe. Click OK to share your story and request access.’);
return;
}

```
// Update active button
document.querySelectorAll('.circle-btn').forEach(btn => {
    btn.classList.remove('active');
});
event.target.classList.add('active');
```

}

function updateWaterState() {
// This would open a modal to change water state
// For now, just cycle through states
const states = {
‘still’: { text: ‘💧 Still Waters’, next: ‘rising’ },
‘rising’: { text: ‘🌊 Rising Tide’, next: ‘flood’ },
‘flood’: { text: ‘🌊🌊 Flood Waters’, next: ‘still’ }
};

```
const currentState = states[currentWaterLevel];
currentWaterLevel = currentState.next;
event.target.textContent = states[currentWaterLevel].text;

localStorage.setItem('waterLevel', currentWaterLevel);
```

}

function updateHeaderWaterState() {
const states = {
‘still’: ‘💧 Still Waters’,
‘rising’: ‘🌊 Rising Tide’,
‘flood’: ‘🌊🌊 Flood Waters’
};

```
const waterBtn = document.querySelector('.water-state-btn');
if (waterBtn) {
    waterBtn.textContent = states[currentWaterLevel] || states.still;
}
```

}

function toggleAllDescriptions() {
const allDescriptions = document.getElementById(‘all-descriptions’);
if (!allDescriptions) {
// Create the all descriptions section
const descriptionsHTML = `
<div id="all-descriptions" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
<h3 style="text-align: center; color: var(--accent); margin-bottom: 30px;">Circle Descriptions & Access Information</h3>

```
            <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                <div class="circle-desc-card">
                    <h4>General Circle</h4>
                    <p><em>Open to all members</em></p>
                    <p>Daily challenges and nonviolent behaviors. Your home base for support in navigating everyday complexities.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Safety Concerns Circle 🗝️</h4>
                    <p><em>Requires vetting</em></p>
                    <p>Physical safety and violence. For families navigating serious safety concerns and physical threats.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Sexual Behaviors Circle 🗝️</h4>
                    <p><em>Requires vetting</em></p>
                    <p>A carefully protected space for families dealing with sexual behavior challenges.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Substance Use Circle 🗝️</h4>
                    <p><em>Requires vetting</em></p>
                    <p>Support for families navigating substance use concerns in the context of safety and complex decisions.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Superpowers</h4>
                    <p><em>Open to all members</em></p>
                    <p>Reframe your child's neurological differences as strengths. Discover how traits like fearlessness, low emotionality, or intense focus can become assets. Find career paths and life directions that work WITH your child's wiring, not against it.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Circle of Hope</h4>
                    <p><em>Open to all members</em></p>
                    <p>Real success stories from real families. Your story could light the way for others.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Community Connection</h4>
                    <p><em>Open to all members</em></p>
                    <p>Remember who you are beyond being a parent. Connect with others as whole human beings - share your passions, dreams, interests, and the parts of yourself that exist outside the crisis. Rediscover yourself while building real friendships.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Research Hub</h4>
                    <p><em>Open to all members</em></p>
                    <p>Read existing research, participate in new studies, and bridge the gap between lived experience and academic understanding. Access peer-reviewed studies, share what researchers are missing, and help shape future research directions.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Education Circle</h4>
                    <p><em>Open to all members</em></p>
                    <p>Beyond research papers - find books, courses, workshops, and evidence-based strategies. Learn about neurodiversity, legal rights, therapeutic approaches, and what actually works from both professionals and experienced parents.</p>
                </div>
                
                <div class="circle-desc-card">
                    <h4>Media Circle</h4>
                    <p><em>Open to all members, limited access for vetted reporters</em></p>
                    <p>Engage with media coverage of our families. Share articles and videos, flag harmful narratives in "Media Got It Wrong," and help reporters understand through "What I Wish Media Understood." Vetted reporters can request interviews with parent consent.</p>
                </div>
            </div>
        </div>
    `;
    
    const mainContent = document.querySelector('.main-content');
    mainContent.insertAdjacentHTML('afterbegin', descriptionsHTML);
    
    // Add styles for the cards if not already added
    if (!document.getElementById('circle-desc-styles')) {
        const style = document.createElement('style');
        style.id = 'circle-desc-styles';
        style.textContent = `
            .circle-desc-card {
                background: var(--bg-secondary);
                padding: 20px;
                border-radius: 8px;
                border: 1px solid var(--border);
            }
            .circle-desc-card h4 {
                color: var(--accent);
                margin-bottom: 10px;
            }
            .circle-desc-card p {
                color: var(--text-secondary);
                margin-bottom: 8px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Scroll to descriptions
    document.getElementById('all-descriptions').scrollIntoView({ behavior: 'smooth' });
    
    // Update button text
    event.target.textContent = 'Hide Circle Descriptions ↑';
} else {
    // Toggle visibility
    if (allDescriptions.style.display === 'none') {
        allDescriptions.style.display = 'block';
        allDescriptions.scrollIntoView({ behavior: 'smooth' });
        event.target.textContent = 'Hide Circle Descriptions ↑';
    } else {
        allDescriptions.style.display = 'none';
        event.target.textContent = 'View Expanded Circle Descriptions ↓';
    }
}
```

}

function updateBridgeBuilderStatus() {
const statuses = [
{ count: 3, text: “3 Bridge Builders Active”, online: true },
{ count: 1, text: “1 Bridge Builder Active”, online: true },
{ count: 0, text: “Bridge Builders Offline - Responses typically within ~6 hours”, online: false }
];

```
// Simulate random status (in real app, this would be from server)
setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const statusEl = document.getElementById('bridgeBuilderStatus');
    const dotEl = document.querySelector('.status-dot');
    
    if (statusEl && dotEl) {
        statusEl.textContent = status.text;
        if (status.online) {
            dotEl.classList.remove('offline');
        } else {
            dotEl.classList.add('offline');
        }
    }
}, 30000); // Update every 30 seconds
```

}

// Community selection handler
document.addEventListener(‘DOMContentLoaded’, function() {
// Add event listener for community checkbox
const communityCheckbox = document.getElementById(‘psychopathy-spectrum’);
if (communityCheckbox) {
communityCheckbox.addEventListener(‘change’, function() {
const continueBtn = document.getElementById(‘communityBtn’);
if (continueBtn) {
continueBtn.disabled = !this.checked;
}
});
}

```
// Add event listeners for role checkboxes
const roleCheckboxes = document.querySelectorAll('input[name="role"]');
roleCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateSelectedRoles();
    });
});
```

});

function updateSelectedRoles() {
const checkboxes = document.querySelectorAll(‘input[name=“role”]:checked’);
selectedRoles = Array.from(checkboxes).map(cb => cb.value);

```
const continueBtn = document.getElementById('roleBtn');
if (continueBtn) {
    continueBtn.disabled = selectedRoles.length === 0;
}
```

}

// Load saved preferences
window.onload = function() {
const savedTheme = localStorage.getItem(‘theme’);
const savedFontSize = localStorage.getItem(‘fontSize’);
const savedWaterLevel = localStorage.getItem(‘waterLevel’);

```
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeButtons = {
        'light': 0,
        'dark': 1,
        'high-contrast': 2,
        'high-contrast-dark': 3
    };
    const btnIndex = themeButtons[savedTheme];
    const button = document.querySelectorAll('.theme-btn')[btnIndex];
    if (button) {
        button.classList.add('active');
        themeSelected = true;
        document.getElementById('comfortCheck').style.display = 'block';
        document.getElementById('continueBtn').disabled = false;
    }
}

if (savedFontSize) {
    const fontSlider = document.getElementById('fontSize');
    if (fontSlider) {
        fontSlider.value = savedFontSize;
        setFontSize(savedFontSize);
    }
}

if (savedWaterLevel) {
    currentWaterLevel = savedWaterLevel;
}
```

};