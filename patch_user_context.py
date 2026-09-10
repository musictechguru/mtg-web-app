import re

with open('src/contexts/UserContext.jsx', 'r') as f:
    content = f.read()

admin_bypass = """
    const adminBypass = () => {
        const mockAdmin = {
            id: 'admin_mock_id',
            email: 'admin@mtg.com',
            is_premium: true,
            role: 'teacher',
            full_name: 'Admin Haswell'
        };
        setCurrentUser(mockAdmin);
        setUserProgress({
           totalScore: 9999,
           quizzesCompleted: 100,
           history: [],
           mastery: {},
           campaignCompleted: campaignData.rounds.flatMap(r => r.nodes.map(n => n.id))
        });
    };
"""

# Find where functions are defined
content = content.replace("const logout = async () => {", admin_bypass + "\n    const logout = async () => {")

# Add to the provider value
content = content.replace("logout,", "logout, adminBypass,")

with open('src/contexts/UserContext.jsx', 'w') as f:
    f.write(content)
