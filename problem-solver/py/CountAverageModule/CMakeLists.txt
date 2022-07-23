file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (CountAverageModule SHARED ${SOURCES})

target_include_directories(CountAverageModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(CountAverageModule sc-memory)

add_dependencies(CountAverageModule sc-memory)

sc_codegen(CountAverageModule ${CMAKE_CURRENT_LIST_DIR})
