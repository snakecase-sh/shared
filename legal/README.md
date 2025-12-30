# Legal Documentation

This directory contains all legal policies and compliance documents for snakecase.sh.

## Files

### 1. TERMS_OF_SERVICE.md
**Purpose:** Legal agreement between snakecase.sh and users

**Key Sections:**
- Acceptance of terms and user eligibility (13+ years)
- Account responsibilities and security
- Acceptable use policy and prohibited activities
- Intellectual property rights
- Termination rights and procedures
- Limitation of liability and disclaimers
- Dispute resolution and arbitration
- Changes to terms notification

**Usage:** Users must accept these terms before using the platform.

### 2. PRIVACY_POLICY.md
**Purpose:** Explains how we collect, use, and protect user data

**Key Sections:**
- Data collection (GitHub profile, messages, usage data)
- Data usage and purpose
- Security measures (AES-256-GCM encryption)
- Third-party services (GitHub OAuth)
- User privacy rights (access, deletion, export)
- Cookie policy and tracking
- Data retention periods
- GDPR compliance (European users)
- CCPA compliance (California residents)

**Usage:** Required disclosure of privacy practices.

### 3. COMMUNITY_GUIDELINES.md
**Purpose:** Standards for user behavior and community conduct

**Key Sections:**
- Respectful communication standards
- Prohibited harassment and hate speech
- No spam or unwanted content
- No illegal or harmful content
- Reporting mechanisms
- Enforcement levels:
  - **Warning:** First-time or minor violations
  - **Jail:** Temporary restriction (24h-30 days)
  - **Ban:** Permanent account termination
- Appeals process

**Usage:** Users agree to follow these guidelines; violations result in enforcement actions.

### 4. ONBOARDING_CONTENT.json
**Purpose:** Structured content for user onboarding flow

**Key Sections:**
- Welcome message and platform description
- Feature highlights (encryption, GitHub integration, etc.)
- Legal acceptance checkboxes
- Community guidelines summary
- Data and privacy FAQ
- Age verification flow
- Notification preferences
- Quick start guide
- Support resources

**Usage:** Frontend applications should load this JSON to display onboarding screens.

## Integration Guide

### For Frontend Developers

#### Loading Legal Documents

```typescript
// Import the onboarding content
import onboardingContent from '@snakecase/shared/legal/ONBOARDING_CONTENT.json';

// Display welcome screen
const { welcome, features } = onboardingContent;
```

#### Displaying Terms Acceptance

```typescript
// Show legal acceptance checkboxes
const { legal } = onboardingContent;

// Example checkbox rendering
legal.termsOfService.label
legal.privacyPolicy.label
legal.communityGuidelines.label
```

#### Age Verification

```typescript
// Implement age verification
const { ageVerification } = onboardingContent;

if (userAge < ageVerification.metadata.minimumAge) {
  // Show underage message
  showMessage(ageVerification.underageMessage);
}
```

### For Backend Developers

#### Storing User Acceptance

When a user accepts the terms, store:

```typescript
interface UserLegalAcceptance {
  userId: string;
  termsVersion: string; // e.g., "1.0.0"
  privacyVersion: string;
  guidelinesVersion: string;
  acceptedAt: Date;
  ipAddress: string; // For legal compliance
  userAgent: string;
}
```

#### Checking Acceptance Status

```typescript
// Before allowing platform access
async function checkLegalAcceptance(userId: string): Promise<boolean> {
  const acceptance = await getUserLegalAcceptance(userId);
  const currentVersions = await getCurrentLegalVersions();

  return (
    acceptance.termsVersion === currentVersions.terms &&
    acceptance.privacyVersion === currentVersions.privacy &&
    acceptance.guidelinesVersion === currentVersions.guidelines
  );
}
```

### For Mobile Developers

#### Displaying Legal Documents

```swift
// iOS Example
func showTermsOfService() {
    guard let termsPath = Bundle.main.path(forResource: "TERMS_OF_SERVICE", ofType: "md") else {
        return
    }
    let termsContent = try? String(contentsOfFile: termsPath)
    // Render markdown content
}
```

```kotlin
// Android Example
fun loadPrivacyPolicy() {
    val privacyPolicy = assets.open("legal/PRIVACY_POLICY.md")
        .bufferedReader()
        .use { it.readText() }
    // Display in WebView or TextView with markdown renderer
}
```

## Version Management

### Updating Legal Documents

When updating any legal document:

1. **Update the "Last Updated" date** at the top of the file
2. **Update the version** in `ONBOARDING_CONTENT.json` metadata
3. **Notify users** of material changes via email and in-app notification
4. **Store the old version** for legal records
5. **Update the database** to track which users have accepted the new version

### Version History

Current versions:
- Terms of Service: 1.0.0 (2025-12-29)
- Privacy Policy: 1.0.0 (2025-12-29)
- Community Guidelines: 1.0.0 (2025-12-29)
- Onboarding Content: 1.0.0 (2025-12-29)

## Enforcement

### Community Guidelines Enforcement Levels

| Level | Trigger | Action | Duration |
|-------|---------|--------|----------|
| Warning | First-time or minor violation | Formal notification | N/A |
| Jail | Moderate or repeated violations | Temporary restriction | 24h - 30 days |
| Ban | Severe or persistent violations | Permanent termination | Permanent |

### Immediate Ban Violations

The following violations result in immediate permanent bans:
- Child exploitation material
- Credible threats of violence
- Doxxing with malicious intent
- Coordinated harassment campaigns
- Ban evasion
- Severe violations after multiple warnings

## Compliance Notes

### GDPR (European Users)

Required features:
- Data access requests (respond within 30 days)
- Data portability (machine-readable format)
- Right to erasure ("right to be forgotten")
- Right to rectification
- Data processing consent management
- Data Protection Officer contact: dpo@snakecase.sh

### CCPA (California Residents)

Required features:
- Notice of data collection
- Opt-out of data sale (we don't sell data)
- Data deletion requests
- Non-discrimination for exercising rights
- Verification of identity for requests

### COPPA (Children's Privacy)

Requirements:
- Minimum age: 13 years
- Parental consent for users 13-18
- No collection of data from children under 13
- Immediate deletion if child data is discovered

## Contact Information

For legal and compliance inquiries:

- **General Legal:** legal@snakecase.sh
- **Privacy:** privacy@snakecase.sh
- **Data Protection Officer:** dpo@snakecase.sh
- **Abuse Reports:** abuse@snakecase.sh
- **Security:** security@snakecase.sh
- **Support:** support@snakecase.sh

## Important Disclaimers

**NOT LEGAL ADVICE:** These documents are provided as-is and do not constitute legal advice. Consult with a qualified attorney to ensure compliance with all applicable laws in your jurisdiction.

**CUSTOMIZE FOR YOUR JURISDICTION:** These templates should be reviewed and customized based on:
- Your company's legal jurisdiction
- Applicable local, state, and international laws
- Your specific business practices
- Advice from your legal counsel

**REGULAR REVIEWS:** Legal requirements change. Review and update these documents:
- At least annually
- When laws change
- When business practices change
- When expanding to new jurisdictions

## Resources

### Legal Compliance Resources

- **GDPR:** https://gdpr.eu/
- **CCPA:** https://oag.ca.gov/privacy/ccpa
- **COPPA:** https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule
- **GitHub Terms:** https://docs.github.com/en/site-policy/github-terms/github-terms-of-service
- **EFF Best Practices:** https://www.eff.org/

### Tools

- **Privacy Policy Generator:** https://www.termsfeed.com/
- **GDPR Compliance Checklist:** https://gdpr.eu/checklist/
- **Legal Document Templates:** Consult legal counsel

## Changelog

### Version 1.0.0 (2025-12-29)
- Initial release of all legal documents
- Created Terms of Service
- Created Privacy Policy
- Created Community Guidelines
- Created Onboarding Content JSON
- Established enforcement procedures
- Added GDPR and CCPA compliance sections

---

**Last Updated:** December 29, 2025

**Maintained by:** Legal Compliance Team

**Review Frequency:** Quarterly or as needed
