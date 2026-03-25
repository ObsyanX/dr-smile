import { CheckCircle2, ChevronRight, AlertCircle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SeoScoreProps {
  score: number;
  checks: {
    label: string;
    passed: boolean;
    suggestion?: string;
  }[];
}

export const BlogSeoScore = ({
  score,
  checks
}: SeoScoreProps) => {
  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 80) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (s >= 50) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };
  
  const getProgressColor = (s: number) => {
    if (s >= 80) return "bg-emerald-500";
    if (s >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getVerdict = (s: number) => {
    if (s >= 80) return "Excellent";
    if (s >= 50) return "Needs Improvement";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-heading font-semibold text-foreground text-lg">SEO Score</h4>
          <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
            <span className={`w-2 h-2 rounded-full ${getProgressColor(score)}`} />
            {getVerdict(score)} 
          </p>
        </div>
        <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-lg ${score >= 80 ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : score >= 50 ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-rose-500 text-rose-500 bg-rose-500/10'}`}>
          {score}
        </div>
      </div>

      <Progress value={score} className="h-2" indicatorClassName={getProgressColor(score)} />

      <div className="space-y-3 pt-4 border-t border-border/50">
        <h5 className="font-medium text-sm text-foreground mb-4">SEO Checklist</h5>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {checks.map((check, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
              <div>
                <p className={`font-medium ${check.passed ? 'text-foreground' : 'text-rose-600 dark:text-rose-400'}`}>
                  {check.label}
                </p>
                {!check.passed && check.suggestion && (
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                    {check.suggestion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex gap-2.5 items-start mt-4">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          The SEO score is calculated live based on keyword density, headings, content length, readability, and internal linking structure. Aim for a score of 80+ before publishing.
        </p>
      </div>
    </div>
  );
};
