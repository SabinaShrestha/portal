require 'rails_helper'

RSpec.describe User, type: :model do
  describe "attributes" do
    it { should respond_to(:homepage) }
  end
end

