require 'faraday'
require 'byebug'
require 'nokogiri'

namespace :ruby_questions_parser do
  task parse: :environment do
    uri = URI('https://itvdn.com/ru/blog/article/ruby-500-questions')

    con = Faraday.new

    res = con.get do |req|
      req.url uri.to_s
      req.headers['User-Agent'] = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      req.headers['Host'] = 'itvdn.com'
      req.headers['Referer'] = 'https://www.google.com/'
    end

    html_doc = Nokogiri::HTML.parse(res.body)
    grade_matcher = { 'Junior' => 0, 'Middle' => 1, 'Senior' => 2 }

    questions_block = html_doc.css('div article p')[2..]

    curr_grade = nil
    curr_tag = nil

    questions_block.each do |curr_p|
      if curr_p.children.inner_text.strip.match?(/(#{grade_matcher.keys.join('|')})/)
        curr_grade = grade_matcher[curr_p.children.inner_text.strip]
        next
      end

      if curr_p.at('strong').present?
        curr_tag = curr_p.at('strong').content.strip
        next
      end

      if curr_p.children.all?(&:text?)
        raw_text = curr_p.children.map(&:content).join(' ').squish
        if raw_text.match? /^\d/
          new_question = Question.new(author: User.first(2).last,
                                      body: raw_text.sub(/^\d+\.\s+/, ''),
                                      grade: ItGrade.find_by(grade: curr_grade))
          new_question.tag_list.add curr_tag
          new_question.save
        end
      end
    end
  end
end
