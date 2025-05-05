#!/bin/bash

# Start date (YYYY-MM-DD) and number of days to spread commits
start_day="2025-05-1"
total_days=10

# Daily time window
day_start_hour=4
day_end_hour=22

# Delay between pushes in seconds (so GitHub sees separate push times)
sleep_duration=10

# Git branch to push to (auto-detect current)
branch_name=$(git rev-parse --abbrev-ref HEAD)

# Total seconds in the commit window
daily_seconds=$(((day_end_hour - day_start_hour) * 3600))
total_seconds=$((total_days * daily_seconds))

# Get all relevant files
files=$(find . -type f \
  -not -path "./.git/*" \
  -not -path "./node_modules/*" \
  -not -name "$(basename "$0")" | sort)

total_files=$(echo "$files" | wc -l)
echo " ~M Found $total_files files. Committing & pushing one by one..."

i=0
for file in $files; do
    [[ "$file" == *"commit"*".sh" ]] && continue

    # Evenly spaced offset per file
    offset=$((i * total_seconds / total_files))
    jitter=$((RANDOM % 900))  # up to 15 min
    offset=$((offset + jitter))

    # Calculate date + time
    days_offset=$((offset / daily_seconds))
    seconds_into_day=$((offset % daily_seconds))

    commit_date=$(date -d "$start_day +$days_offset day" +%Y-%m-%d)
    hour=$((day_start_hour + seconds_into_day / 3600))
    minute=$(((seconds_into_day % 3600) / 60))
    second=$((seconds_into_day % 60))
    commit_time=$(printf "%sT%02d:%02d:%02d" "$commit_date" "$hour" "$minute" "$second")

    # Add a small modification (for example, adding a comment to the file)
    echo "// Commit update: Changes for commit" >> "$file"

    # Stage and commit the change
    git add "$file"
    GIT_AUTHOR_DATE="$commit_time" GIT_COMMITTER_DATE="$commit_time" \
    git commit -m "Add changes to $file"

    echo "✅ Committed $file at $commit_time"

    # Push after each commit
    git push origin "$branch_name"
    echo " ~@ Pushed commit for $file"

    # Optional delay to space out push times
    echo "⏳ Sleeping $sleep_duration seconds..."
    sleep $sleep_duration

    ((i++))
done

echo " ~I Done $i files committed and pushed separately."
