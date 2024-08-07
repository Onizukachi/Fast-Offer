# frozen_string_literal: true

class OllamaAnswerGeneratorJob
  include Sidekiq::Job

  def perform(**)
    client = Ollama.new(
      credentials: { address: ENV['OLLAMA_API_URL'] },
      options: { server_sent_events: true }
    )

    Question.find_each do |question|
      result = client.generate({ model: 'mistral', prompt: question.body, stream: false })
      response = result[0]["response"].squish

      question.answers.create!(author: User.last, body: response)
    end
  end
end
