export interface SeoCheck {
  label: string;
  passed: boolean;
  scoreValue: number;
  suggestion?: string;
}

export interface SeoScoreResult {
  score: number;
  checks: SeoCheck[];
}

export const calculateSeoScore = (
  contentHtml: string,
  plainText: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  keywords: string[]
): SeoScoreResult => {
  const checks: SeoCheck[] = [];
  let totalScore = 0;

  // Helper counts
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const primaryKeyword = keywords[0]?.toLowerCase() || "";
  
  // 1. Content Length
  if (wordCount >= 1200) {
    checks.push({ label: "Content is >1200 words", passed: true, scoreValue: 20 });
    totalScore += 20;
  } else if (wordCount >= 800) {
    checks.push({ label: "Content is >800 words", passed: true, scoreValue: 10, suggestion: "Aim for 1200+ for maximum ranking" });
    totalScore += 10;
  } else {
    checks.push({ label: "Content too short", passed: false, scoreValue: 0, suggestion: `Currently ${wordCount} words. Minimum 800 words recommended.` });
  }

  // 2. Keyword Check
  if (primaryKeyword) {
    // Title
    const titleHasKw = title.toLowerCase().includes(primaryKeyword) || seoTitle.toLowerCase().includes(primaryKeyword);
    checks.push({
      label: "Keyword in Title",
      passed: titleHasKw,
      scoreValue: titleHasKw ? 10 : 0,
      suggestion: !titleHasKw ? "Include primary keyword in your Meta SEO Title." : undefined
    });
    if (titleHasKw) totalScore += 10;

    // First Paragraph
    const firstParagraphMatch = contentHtml.match(/<p>(.*?)<\/p>/i);
    const inFirstP = firstParagraphMatch && firstParagraphMatch[1].toLowerCase().includes(primaryKeyword);
    checks.push({
      label: "Keyword in first paragraph",
      passed: !!inFirstP,
      scoreValue: inFirstP ? 10 : 0,
      suggestion: !inFirstP ? "Add your primary keyword to the first paragraph of the article." : undefined
    });
    if (inFirstP) totalScore += 10;

    // Density
    const kwCount = (plainText.toLowerCase().match(new RegExp(primaryKeyword, 'g')) || []).length;
    const density = wordCount > 0 ? (kwCount / wordCount) * 100 : 0;
    const densityPass = density >= 0.5 && density <= 2.5; // Made slightly lenient (0.5 to 2.5%)
    checks.push({
      label: `Keyword Density (${density.toFixed(1)}%)`,
      passed: densityPass,
      scoreValue: densityPass ? 10 : 0,
      suggestion: density < 0.5 ? "Use keyword more often." : density > 2.5 ? "Using keyword too often (stop keyword stuffing)." : undefined
    });
    if (densityPass) totalScore += 10;
  } else {
    checks.push({ label: "Primary keyword set", passed: false, scoreValue: 0, suggestion: "Set at least one target keyword." });
  }

  // 3. Meta SEO
  checks.push({
    label: "Meta Title & Description",
    passed: !!(seoTitle && seoDescription),
    scoreValue: (seoTitle && seoDescription) ? 20 : 0,
    suggestion: "Ensure both SEO Meta fields are filled."
  });
  if (seoTitle && seoDescription) totalScore += 20;

  // 4. Structure (Headings)
  const hasH1 = /<h1[^>]*>/.test(contentHtml) || !!title; // Title usually acts as H1
  checks.push({ label: "H1 Header Present", passed: hasH1, scoreValue: hasH1 ? 5 : 0 });
  if (hasH1) totalScore += 5;

  const hasH2H3 = /<h[2-3][^>]*>/.test(contentHtml);
  checks.push({
    label: "H2/H3 Headers used",
    passed: hasH2H3,
    scoreValue: hasH2H3 ? 10 : 0,
    suggestion: !hasH2H3 ? "Break up text with H2 and H3 subheadings." : undefined
  });
  if (hasH2H3) totalScore += 10;

  // 5. Links & Media
  const internalLinks = (contentHtml.match(/<a[^>]*href="[^"]*"[^>]*>/gi) || []).length;
  const linksPass = internalLinks >= 2;
  checks.push({
    label: "Internal Linking",
    passed: linksPass,
    scoreValue: linksPass ? 10 : 0,
    suggestion: `Found ${internalLinks} link(s). Add at least 2 internal links.`
  });
  if (linksPass) totalScore += 10;

  const hasImages = /<img[^>]*>/.test(contentHtml);
  checks.push({
    label: "Images & Media",
    passed: hasImages,
    scoreValue: hasImages ? 5 : 0,
    suggestion: !hasImages ? "Add an image to the post." : undefined
  });
  if (hasImages) totalScore += 5;

  // 6. Readability Check (Sentence Lengths)
  // Simplified approx. check for sentences > 25 words
  const sentences = plainText.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 25);
  const percentLong = sentences.length > 0 ? (longSentences.length / sentences.length) * 100 : 0;
  
  const readabilityPass = percentLong <= 25; // No more than 25% of sentences should be >25 words
  checks.push({
    label: "Readability & Sentence Length",
    passed: readabilityPass,
    scoreValue: readabilityPass ? 0 : 0, // This is a negative penalty check rather than a positive score usually, but let's just make it descriptive.
    suggestion: !readabilityPass ? `${percentLong.toFixed(1)}% of your sentences are longer than 25 words. Shorten paragraphs for readability.` : undefined
  });

  return {
    score: Math.min(100, totalScore), // Cap at 100
    checks
  };
};
