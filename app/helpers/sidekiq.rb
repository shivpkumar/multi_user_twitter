def job_is_complete(jid)
  waiting = Sidekiq::Queue.new
  working = Sidekiq::Workers.new
  pending = Sidekiq::ScheduledSet.new
  return "pending" if pending.find { |job| job.jid == jid }
  return "waiting" if waiting.find { |job| job.jid == jid }
  return "working" if working.find { |worker, info| info["payload"]["jid"] == jid }
  return "posted"
end