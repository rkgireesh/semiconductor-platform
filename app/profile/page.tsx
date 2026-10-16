"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getFullProgressStore } from "@/lib/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  User as UserIcon,
  Mail,
  Shield,
  Award,
  LogOut,
  Edit3,
  Save,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Cpu,
  Clock,
  Briefcase
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/types/database";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form edit states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");

  // Learning stats from localStorage
  const [progressStats, setProgressStats] = useState({
    completedCount: 0,
    quizScoreCount: 0,
  });

  useEffect(() => {
    async function loadData() {
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !currentUser) {
        router.push("/login?redirectTo=/profile");
        return;
      }

      setUser(currentUser);

      // Fetch profile from database
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (userProfile) {
        setProfile(userProfile);
        setFullName(userProfile.full_name || currentUser.user_metadata?.full_name || "");
        setUsername(userProfile.username || currentUser.user_metadata?.username || currentUser.email?.split("@")[0] || "");
        setBio(userProfile.bio || currentUser.user_metadata?.bio || "");
        setExperienceLevel(userProfile.experience_level || currentUser.user_metadata?.experience_level || "Beginner");
      } else {
        // Fallback from auth metadata
        setFullName(currentUser.user_metadata?.full_name || "");
        setUsername(currentUser.user_metadata?.username || currentUser.email?.split("@")[0] || "");
        setBio(currentUser.user_metadata?.bio || "");
        setExperienceLevel(currentUser.user_metadata?.experience_level || "Beginner");
      }

      // Load local learning progress stats
      const store = getFullProgressStore();
      const completedCount = Object.keys(store.completedLessons || {}).length;
      const quizScoreCount = Object.keys(store.quizScores || {}).length;
      setProgressStats({ completedCount, quizScoreCount });

      setLoading(false);
    }

    loadData();
  }, [router, supabase]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const updates = {
        id: user.id,
        full_name: fullName,
        username,
        bio,
        experience_level: experienceLevel,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(updates);

      if (!error) {
        setProfile((prev) => ({ ...(prev || {}), ...updates } as Profile));
        setEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      // Graceful error handling
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center my-auto py-20 text-cyan-400">
          <Sparkles className="w-10 h-10 animate-spin mb-4" />
          <p className="text-sm font-mono text-slate-400">Decrypting user profile & telemetry...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        {/* Banner Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-slate-800 p-6 md:p-8 overflow-hidden mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 border-2 border-cyan-400/50 flex items-center justify-center text-slate-950 font-bold text-3xl shadow-xl shadow-cyan-500/20 shrink-0">
                {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "E"}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                    {fullName || "Silicon Engineer"}
                  </h1>
                  <Badge variant="cyan" size="sm">
                    {experienceLevel}
                  </Badge>
                </div>

                <p className="text-sm font-mono text-slate-400 mt-1 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {user?.email}
                </p>

                <p className="text-xs font-mono text-slate-500 mt-1">
                  @{(username || user?.email?.split("@")[0] || "engineer").toLowerCase()} &bull; Member since {new Date(user?.created_at || "").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {!editing ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditing(true)}
                  icon={<Edit3 className="w-4 h-4" />}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20"
                icon={<LogOut className="w-4 h-4" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Profile successfully updated in Supabase database!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details & Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            {editing ? (
              <Card className="p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-cyan-400" />
                  Edit Engineer Profile
                </h3>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Bio / Specialization
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="e.g. CMOS VLSI designer focused on low-power FinFET design and Verilog synthesis."
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Beginner">Beginner (Student / Enthusiast)</option>
                      <option value="Intermediate">Intermediate (Undergrad / Junior Engineer)</option>
                      <option value="Advanced">Advanced (VLSI / Physical Design Engineer)</option>
                      <option value="Expert">Expert (RTL / Tape-out Specialist)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={saving}
                      icon={saving ? <Sparkles className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    About / Bio
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {profile?.bio || bio || "No bio added yet. Click 'Edit Profile' to share your background in semiconductor physics, RTL, or chip design."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-1">
                      <Briefcase className="w-4 h-4" />
                      Domain Specialty
                    </div>
                    <p className="text-slate-200 font-semibold text-sm">
                      {experienceLevel} Level Engineer
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase mb-1">
                      <Shield className="w-4 h-4" />
                      Account Security
                    </div>
                    <p className="text-slate-200 font-semibold text-sm">
                      Authenticated via Supabase
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Platform Learning Progress Summary */}
            <Card glow className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    Learning Progress & Telemetry
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tracked locally across Interactive Roadmaps, Labs & Quizzes
                  </p>
                </div>
                <Link href="/roadmap" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
                  View Roadmap &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black text-cyan-400 font-mono">
                    {progressStats.completedCount}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                    Completed Lessons
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black text-sky-400 font-mono">
                    {progressStats.quizScoreCount}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
                    <Award className="w-3.5 h-3.5 text-sky-500" />
                    Quizzes Passed
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-teal-400 font-mono">
                    {progressStats.completedCount > 0 ? `${progressStats.completedCount * 10}%` : "0%"}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    Overall Mastery
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-cyan-400" />
                Account Details
              </h4>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">USER ID</span>
                  <span className="text-slate-300 break-all">{user?.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">AUTHENTICATION</span>
                  <span className="text-emerald-400">Supabase Auth (SSL Encrypted)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ROW LEVEL SECURITY</span>
                  <span className="text-cyan-400">Enabled on public.profiles</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                Quick Links
              </h4>
              <div className="space-y-2 text-sm">
                <Link href="/courses" className="block p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors">
                  &rarr; Explore All Courses
                </Link>
                <Link href="/labs" className="block p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors">
                  &rarr; Virtual Semiconductor Labs
                </Link>
                <Link href="/explorer" className="block p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors">
                  &rarr; Interactive Chip Explorer
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
