import re

with open('src/components/LoginScreen.jsx', 'r') as f:
    content = f.read()

# Add adminBypass to imports
content = content.replace("const { login, signup, resetPassword, resendVerification, loading } = useUser();", "const { login, signup, resetPassword, resendVerification, loading, adminBypass } = useUser();")

admin_btn = """
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={adminBypass}
                                style={{
                                    background: 'transparent',
                                    border: '1px dashed var(--accent-warning)',
                                    color: 'var(--accent-warning)',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                ⚠️ Dev: Admin Login
                            </button>
                        </div>
"""

content = content.replace("</form>", "</form>" + admin_btn)

with open('src/components/LoginScreen.jsx', 'w') as f:
    f.write(content)
