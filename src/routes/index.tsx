import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import zxcvbn from "zxcvbn";
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Check, X, Lock } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Password Strength Checker" },
      { name: "description", content: "Analyze password strength in real time with zxcvbn entropy scoring, crack-time estimates, and actionable feedback." },
      { property: "og:title", content: "Password Strength Checker" },
      { property: "og:description", content: "Analyze password strength in real time with entropy scoring and crack-time estimates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PasswordStrengthChecker,
});

const STRENGTH_LEVELS = [
  { label: "Very Weak", color: "bg-strength-very-weak text-strength-very-weak" },
  { label: "Weak", color: "bg-strength-weak text-strength-weak" },
  { label: "Fair", color: "bg-strength-fair text-strength-fair" },
  { label: "Strong", color: "bg-strength-strong text-strength-strong" },
  { label: "Very Strong", color: "bg-strength-very-strong text-strength-very-strong" },
];

const CHECKLIST = [
  { key: "length", label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { key: "uppercase", label: "Uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { key: "lowercase", label: "Lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { key: "number", label: "Number", test: (value: string) => /[0-9]/.test(value) },
  { key: "special", label: "Special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => {
    if (!password) {
      return {
        score: -1,
        crackTime: "",
        warning: "",
        suggestions: [],
      };
    }
    const result = zxcvbn(password);
    return {
      score: result.score,
      crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
      warning: result.feedback.warning,
      suggestions: result.feedback.suggestions,
    };
  }, [password]);

  const currentLevel = STRENGTH_LEVELS[analysis.score] ?? null;
  const filledSegments = analysis.score >= 0 ? analysis.score + 1 : 0;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Lock className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
            Password Strength Checker
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time entropy analysis and crack-time estimates
          </p>
        </div>

        <Card className="border border-border/50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">Analyze your password</CardTitle>
            <CardDescription>
              Type below to see how long it would take to crack.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password..."
                className="h-12 pr-12 text-base"
                autoComplete="off"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {analysis.score >= 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Strength</span>
                    <span
                      className={cn(
                        "font-semibold",
                        currentLevel?.color.split(" ").find((c) => c.startsWith("text-")),
                      )}
                    >
                      {currentLevel?.label}
                    </span>
                  </div>

                  <div className="flex gap-1.5" role="img" aria-label={`Strength: ${currentLevel?.label}`}>
                    {STRENGTH_LEVELS.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-2 flex-1 rounded-full transition-all duration-300",
                          index < filledSegments
                            ? currentLevel?.color.split(" ").find((c) => c.startsWith("bg-"))
                            : "bg-muted",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-muted/50 p-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {analysis.score >= 3 ? (
                      <ShieldCheck className="h-4 w-4 text-strength-strong" />
                    ) : (
                      <ShieldAlert className="h-4 w-4 text-strength-weak" />
                    )}
                    <span>
                      Estimated crack time: {" "}
                      <span className="font-medium text-foreground">{analysis.crackTime}</span>
                    </span>
                  </div>
                </div>

                {(analysis.warning || analysis.suggestions.length > 0) && (
                  <div className="space-y-2 rounded-lg border border-border/50 bg-card p-3 text-sm">
                    {analysis.warning && (
                      <p className="font-medium text-destructive">{analysis.warning}</p>
                    )}
                    {analysis.suggestions.length > 0 && (
                      <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                        {analysis.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Requirements</p>
              <ul className="space-y-2">
                {CHECKLIST.map((item) => {
                  const passed = item.test(password);
                  return (
                    <li
                      key={item.key}
                      className={cn(
                        "flex items-center gap-2 text-sm transition-colors",
                        passed ? "text-strength-strong" : "text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                          passed
                            ? "border-strength-strong bg-strength-strong text-primary-foreground"
                            : "border-muted",
                        )}
                      >
                        {passed ? (
                          <Check className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <X className="h-3 w-3 opacity-50" aria-hidden="true" />
                        )}
                      </span>
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          This tool runs entirely in your browser. Your password is never sent or stored anywhere.
        </p>
      </div>
    </main>
  );
}
