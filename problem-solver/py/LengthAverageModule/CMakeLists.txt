file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (LengthAverageModule SHARED ${SOURCES})

target_include_directories(LengthAverageModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(LengthAverageModule sc-memory)

add_dependencies(LengthAverageModule sc-memory)

sc_codegen(LengthAverageModule ${CMAKE_CURRENT_LIST_DIR})
