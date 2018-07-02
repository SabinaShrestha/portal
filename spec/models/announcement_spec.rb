require 'rails_helper'

RSpec.describe Announcement, type: :model do
  it { should belong_to(:course) }

  describe 'validations' do 
    it { should validate_presence_of(:body)}
    it { should validate_presence_of(:course_id)}
    it { should validate_presence_of(:published)}
    it { should validate_presence_of(:publish_at)}
  end
end

