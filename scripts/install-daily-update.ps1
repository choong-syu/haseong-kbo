$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ScriptPath = Join-Path $ProjectRoot "scripts\update-stats.mjs"
$NodePath = (Get-Command node).Source
$Interval = New-TimeSpan -Minutes 15
$Duration = New-TimeSpan -Days 3650

$Action = New-ScheduledTaskAction -Execute $NodePath -Argument "`"$ScriptPath`"" -WorkingDirectory $ProjectRoot
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval $Interval -RepetitionDuration $Duration
$Settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew

Register-ScheduledTask `
  -TaskName "KBO Team Stats Daily Update" `
  -Action $Action `
  -Trigger $Trigger `
  -Settings $Settings `
  -Description "Update KBO team and player stats JSON every 15 minutes." `
  -Force

Write-Host "Registered KBO update task every 15 minutes."
